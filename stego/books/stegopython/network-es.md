---
layout: page
title: "Esteganografía para programadores Python"
subtitle: "Esteganografía en protocolos de red" 
noindex: false
meta-title: "Esteganografía para programadores Python: Esteganografía en protocolos de red"
meta-description: "Capítulo 'Esteganografía en protocolos de red' del libro 'Esteganografía para programadores Python'"
meta-keywords: "esteganografía, Python"
lang-suffix: "-es"
comments: true
---

<center style='margin-bottom:30px'>
[ &nbsp; <a href='/books-es'>Índice</a> ]
</center>





<style>
    [id]::before {
        content: '';
        display: block;
        height:      70px;
        margin-top: -70px;
        visibility: hidden;
    }
</style>

<div class='menu' style='margin-top:50px'></div>

## Contenido

1. [Introducción](#introducción)  
2. [Estructura del canal encubierto](#estructura-del-canal-encubierto)  
3. [Scapy y Netfilter](#scapy-y-netfilter)  
   1. [Ejemplo básico con PING](#ejemplo-básico-con-ping)  
   2. [Filtros BPF en Scapy](#filtros-bpf-en-scapy)  
4. [Modificación de tráfico en tiempo real](#modificación-de-tráfico-en-tiempo-real)  
   1. [Introducción](#modificación-de-tráfico-en-tiempo-real)  
   2. [Interceptar y modificar el tráfico de red](#interceptar-y-modificar-el-tráfico-de-red)  
   3. [Redirección a la cola de Netfilter](#redirección-a-la-cola-de-netfilter)  
   4. [Reglas IPTABLES](#reglas-iptables)  
   5. [Eliminación de reglas](#eliminación-de-reglas)  
   6. [Envío de mensajes modificando el tráfico](#envío-de-mensajes-modificando-el-tráfico)  
   7. [Recepción del mensaje](#recepción-del-mensaje)  
5. [Modificación de paquetes](#modificación-de-paquetes)  
   1. [El equilibrio de la modificación](#el-equilibrio-de-la-modificación)  
   2. [Alterando las marcas de tiempo en TCP](#alterando-las-marcas-de-tiempo-en-tcp)  
   3. [Ejemplo práctico: inserción en TSval](#ejemplo-práctico-inserción-en-tsval)  
   4. [Extracción del mensaje en el receptor](#extracción-del-mensaje-en-el-receptor)  
   5. [Cómo realizar una prueba práctica](#cómo-realizar-una-prueba-práctica)  
   6. [Consideraciones y mejoras posibles](#consideraciones-y-mejoras-posibles)  
   7. [Otras posibilidades de modificación](#otras-posibilidades-de-modificación)  
6. [Retrasos en la transmisión](#retrasos-en-la-transmisión)  
   1. [Retrasos como canal de comunicación](#retrasos-como-canal-de-comunicación)  
   2. [Retrasos en ICMP](#retrasos-en-icmp)  
   3. [Extracción del mensaje en el receptor](#extracción-del-mensaje-en-el-receptor-1)  
   4. [Cómo poner a prueba el canal de tiempo](#cómo-poner-a-prueba-el-canal-de-tiempo)  
   5. [Aspectos a considerar](#aspectos-a-considerar)  
7. [Reordenamiento de datagramas](#reordenamiento-de-datagramas)  
   1. [Reordenar en lugar de modificar](#reordenar-en-lugar-de-modificar)  
   2. [Ejemplo práctico: emisor de datagramas reordenados](#ejemplo-práctico-emisor-de-datagramas-reordenados)  
   3. [Extracción del mensaje en el receptor](#extracción-del-mensaje-en-el-receptor-2)  
   4. [Cómo hacer la prueba](#cómo-hacer-la-prueba)  
   5. [Análisis y posibilidades de mejora](#análisis-y-posibilidades-de-mejora)  
8. [Implicaciones y desafíos](#implicaciones-y-desafíos)



<br>

## Introducción

La esteganografía en protocolos de red constituye una de las áreas menos exploradas de la ocultación de información. A diferencia de la esteganografía tradicional, que actúa sobre archivos multimedia como imágenes, audio o vídeo, este enfoque se basa en modificar, manipular o explotar los protocolos de comunicación que rigen el tráfico de datos en una red, con el fin de insertar mensajes ocultos sin alterar perceptiblemente el comportamiento de las comunicaciones.

Los protocolos de red definen cómo se transmiten los datos entre dispositivos, especificando aspectos como la estructura de los paquetes, el orden de entrega, los tiempos de retransmisión y otros elementos esenciales para el funcionamiento de Internet. Esta complejidad, sumada a la enorme cantidad de tráfico legítimo que circula constantemente, convierte los protocolos en un canal potencialmente ideal para ocultar información. En efecto, una alteración sutil en ciertos campos de un paquete IP o un retraso intencionado entre dos solicitudes puede pasar desapercibido en un mar de datos aparentemente normales.

Existen múltiples vectores esteganográficos dentro del mundo de los protocolos. Algunos de los más comunes incluyen:

- **Modificación de campos en cabeceras de protocolos**, como los campos de identificación en IP, los números de secuencia en TCP o las banderas de control.
- **Manipulación del tiempo entre paquetes**, donde el mensaje se codifica en la temporización de los paquetes enviados.
- **Encapsulación de datos dentro de cargas útiles aparentemente inocuas**, como peticiones HTTP, paquetes DNS o incluso en cabeceras redundantes.
- **Alteración del orden de envío de los paquetes**, modificando la secuencia de envío para codificar información de forma encubierta.

Si bien la capacidad de ocultación de datos en protocolos de red es limitada en cuanto a volumen, su capacidad para pasar desapercibida en entornos controlados o bajo vigilancia es notable. 

<br>
## Estructura del canal encubierto

La esteganografía aplicada a redes de comunicación consiste en alterar de forma sutil el tráfico legítimo de datos con el fin de insertar mensajes ocultos, sin interrumpir ni modificar el funcionamiento del protocolo ni el contenido aparente de la información transmitida. Este tipo de técnica, cuando se implementa sobre un protocolo para transmitir información adicional de forma encubierta, recibe el nombre de **canal encubierto** (*covert channel*).

La efectividad de una comunicación esteganográfica en red radica en que las modificaciones realizadas pasen completamente desapercibidas, tanto para observadores humanos como para herramientas automatizadas de análisis de tráfico, como los sistemas de detección de intrusos (IDS). Una alteración demasiado evidente podría revelar la existencia del canal encubierto, anulando el propósito de la esteganografía.

En un canal encubierto participan dos actores fundamentales: el **emisor** y el **receptor**. El emisor es quien introduce el mensaje oculto en el flujo de datos, empleando técnicas esteganográficas sobre parámetros del protocolo que lo permitan. Estas modificaciones pueden ir desde el uso de bits reservados o no utilizados en cabeceras de protocolos, hasta estrategias más complejas como la manipulación de los intervalos temporales entre paquetes. El objetivo principal es que dichas alteraciones sean indistinguibles del comportamiento normal del tráfico para cualquier observador no autorizado.

Por su parte, el receptor no modifica el tráfico, sino que se encarga de observarlo y extraer el mensaje oculto. Para ello, debe conocer el método de incrustación utilizado y, en muchos casos, disponer de claves, algoritmos o sincronización específica que le permitan descifrar correctamente la información oculta. Este proceso puede implicar análisis de cabeceras, temporización, patrones estadísticos u otros indicadores previamente acordados entre ambas partes.

En un escenario ideal, el canal encubierto no debería requerir la creación de una nueva comunicación. En lugar de ello, lo óptimo es modificar levemente una comunicación legítima ya existente, lo que maximiza la indetectabilidad del canal. Sin embargo, esta estrategia supone una serie de requisitos técnicos: el emisor debe tener acceso al tráfico de red que se desea manipular, así como los permisos necesarios para intervenir en él. En ausencia de estas condiciones, el canal encubierto puede construirse iniciando una comunicación aparentemente inocua, sobre la cual se introducen posteriormente los mensajes ocultos.

Por ejemplo, un usuario podría abrir una conexión HTTP estándar hacia una página web legítima, generando tráfico que se comporta de forma completamente normal desde el punto de vista de cualquier sistema de monitoreo. Sin embargo, mediante ligeras alteraciones en campos de las cabeceras HTTP, como los valores de las cookies, los identificadores de sesión o los encabezados personalizados, puede transmitirse información esteganográfica sin levantar sospechas.

<br>
## Scapy y Netfilter

Las técnicas que abordaremos en este capítulo requieren acceso a bajo nivel al tráfico de red. Para ello, utilizaremos dos herramientas fundamentales: la librería Scapy, que permite construir y modificar paquetes de red, y el subsistema Netfilter, que nos da la posibilidad de interceptar paquetes en tiempo real y redirigirlos a una cola de procesamiento en espacio de usuario, a través de la librería NetfilterQueue.

Scapy es una herramienta muy versátil, escrita en Python, que permite crear, enviar, capturar y analizar paquetes de red de múltiples protocolos. Es multiplataforma y puede utilizarse en distintos entornos operativos. Sin embargo, su funcionalidad completa, depende del sistema operativo subyacente.

Netfilter es un componente del núcleo Linux que permite aplicar reglas de filtrado, redireccionamiento y manipulación del tráfico de red. Es la base del conocido sistema de reglas iptables, y permite redirigir paquetes a una cola especial para su inspección y modificación en espacio de usuario. Esta funcionalidad es clave para la esteganografía en tráfico en vivo, ya que nos permite intervenir directamente en comunicaciones activas sin necesidad de originarlas.

La librería NetfilterQueue actúa como interfaz entre el núcleo de Linux y el programa Python que procesará los paquetes. Permite acceder a los paquetes redirigidos desde iptables, modificarlos en tiempo real y decidir si se aceptan, se descartan o se sustituyen.

Por tanto, para seguir los ejemplos prácticos de este capítulo —especialmente aquellos que requieren interceptar y modificar tráfico legítimo— es necesario utilizar una distribución Linux. Esto puede hacerse directamente sobre una máquina física, una máquina virtual o un entorno de contenedores, siempre que el sistema disponga de soporte para iptables, el módulo nf_netlink_queue, y permisos suficientes para ejecutar operaciones de red a bajo nivel.

<br>
### Ejemplo básico con PING

Para ilustrar cómo se puede establecer un canal encubierto utilizando un protocolo de red sencillo, vamos a estudiar un ejemplo con el comando ping, ampliamente conocido por su uso en tareas de diagnóstico de conectividad. Este comando genera un paquete ICMP Echo Request que es enviado a un destino; si el host de destino está activo y accesible, responde con un paquete ICMP Echo Reply.

El protocolo ICMP (*Internet Control Message Protocol*) es un componente fundamental del conjunto de protocolos TCP/IP. Su función principal es la de enviar mensajes de control y diagnóstico sobre el estado de la red, permitiendo detectar errores en la transmisión de paquetes o conocer la disponibilidad de un host. Uno de los mensajes ICMP más conocidos es el Echo Request, acompañado de su respuesta correspondiente, Echo Reply.

Estas dos formas de mensaje son las que utiliza la herramienta ping, cuyo propósito es comprobar si un host remoto está accesible y medir el tiempo que tarda en responder. Internamente, ping envía un paquete ICMP Echo Request al destino, y si este responde, se recibe un ICMP Echo Reply. Este mecanismo es ampliamente utilizado para pruebas básicas de conectividad en redes informáticas.

Dado que los paquetes ICMP permiten incluir una carga útil de datos, podemos aprovechar esta característica para introducir en ella un mensaje oculto. A continuación, se muestra un ejemplo en Python utilizando la librería Scapy, que permite construir y enviar paquetes de red de manera sencilla:

```python
from scapy.all import *

dest = "192.168.0.2"
paquete = IP(dst=dest) / ICMP() / "hello world"

send(paquete)
```

En este ejemplo, se define una dirección IP de destino (192.168.0.2), que debe ser sustituida por la dirección IP del receptor. El paquete construido consta de tres partes: una cabecera IP, una cabecera ICMP, y finalmente una carga útil con el mensaje de texto ``hello world''. El operador `/` permite concatenar capas del paquete en Scapy, creando estructuras anidadas.

Este método tiene la ventaja de su simplicidad, pero también presenta limitaciones importantes. La información oculta queda incrustada directamente como texto plano en los paquetes, por lo que resulta trivialmente detectable mediante herramientas de análisis de tráfico. Aun así, este ejemplo nos sirve como introducción a los conceptos fundamentales de esteganografía en red.

Para recuperar el mensaje enviado, el receptor no necesita generar tráfico ni modificar paquetes; basta con que observe la red. A continuación, se muestra cómo capturar los mensajes ICMP Echo entrantes y extraer su contenido:

```python
from scapy.all import *

def capture(packet):               
    if packet.haslayer(Raw):
        msg = packet[Raw].load
        print(f"Message: {msg}")

sniff(filter="icmp and icmp[icmptype] == icmp-echo", 
      prn=capture) 
```

Este script captura paquetes ICMP de tipo Echo Request (tipo 8) usando un filtro BPF (Berkeley Packet Filter), especificado en la función `sniff`. Solo se procesarán los paquetes que contengan una capa `Raw`, es decir, que incluyan datos adicionales, como nuestro mensaje.

**Ejecución de la prueba**:

Para probar este canal encubierto básico, basta con ejecutar el script del receptor en una terminal (por ejemplo, en un contenedor o máquina virtual), y posteriormente lanzar el script del emisor desde otra terminal o máquina distinta dentro de la misma red. Es importante ajustar correctamente la variable `dest` en el emisor, de modo que apunte a la dirección IP del receptor.

Durante la ejecución, el emisor mostrará algo como lo siguiente:

```bash
root@host1$ python3 sender.py 
.
Sent 1 packets.
```

Mientras tanto, el receptor imprimirá en pantalla el contenido del mensaje oculto recibido:

```bash
root@host2$ python3 receiver.py 
Mensaje: b'hello world'
```

Este sencillo ejemplo demuestra cómo un canal encubierto puede construirse sobre protocolos estándar como ICMP. Aunque fácilmente detectable, representa una base útil para desarrollar sistemas más sofisticados en los que las modificaciones sean menos evidentes o estén mejor camufladas en el tráfico legítimo.

<br>
### Filtros BPF en Scapy

Para capturar únicamente los paquetes relevantes en una red, la herramienta Scapy permite aplicar filtros BPF (*Berkeley Packet Filter*), un sistema ampliamente utilizado en herramientas como tcpdump o Wireshark.

Los filtros BPF permiten definir condiciones lógicas que deben cumplir los paquetes para ser procesados por el programa. Esta funcionalidad es fundamental para reducir la carga de procesamiento y centrarse únicamente en los paquetes que pueden contener información útil o relevante para nuestro canal encubierto.

Un filtro BPF se escribe como una cadena de texto que define los criterios de selección. Algunos ejemplos básicos incluyen:

- `icmp`: captura todos los paquetes ICMP.
- `tcp port 80`: captura tráfico TCP que tenga como puerto de destino o origen el puerto 80.
- `udp and port 53`: selecciona paquetes UDP que utilicen el puerto 53, típicamente DNS.
- `ip src 192.168.0.1`: filtra paquetes IP cuyo origen sea `192.168.0.1`.

En el ejemplo del apartado anterior, el filtro utilizado fue:

```python
filter="icmp and icmp[icmptype] == icmp-echo"
```

Este filtro selecciona únicamente los paquetes ICMP cuyo tipo (`icmptype`) sea `8`, correspondiente a un *Echo Request*. La sintaxis `icmp[icmptype]` permite acceder directamente a campos dentro de la cabecera ICMP, utilizando desplazamientos en bytes. Esta capacidad de acceder a campos internos lo convierte en un sistema de filtrado extremadamente eficiente y potente.

Al combinar BPF con Scapy, podemos construir sistemas ligeros de monitoreo o extracción de mensajes encubiertos sin necesidad de analizar grandes volúmenes de datos irrelevantes. Su uso adecuado es especialmente importante en contextos de esteganografía en red, donde la eficiencia y la discreción son esenciales.

Para una referencia más completa sobre filtros BPF, puede consultarse la siguiente documentación de tcpdump:

[https://www.tcpdump.org/manpages/pcap-filter.7.html](https://www.tcpdump.org/manpages/pcap-filter.7.html)

<br>
## Modificación de tráfico en tiempo real

<br>
### Introducción

Una de las técnicas más sofisticadas y efectivas en esteganografía de red consiste en ocultar información dentro de comunicaciones legítimas ya establecidas. A diferencia de los métodos que generan tráfico artificial desde cero, esta estrategia aprovecha flujos de datos reales entre dispositivos, insertando mensajes ocultos sin interrumpir el funcionamiento normal del protocolo para no despertar sospechas. El reto principal es lograr que estas modificaciones pasen desapercibidas tanto para el receptor legítimo como para los sistemas de análisis y detección, como los IDS (*Intrusion Detection Systems*).

Este enfoque presenta ventajas importantes desde el punto de vista de la indetectabilidad. Al camuflarse en comunicaciones activas, el canal oculto hereda la legitimidad del tráfico original, dificultando su identificación por técnicas de estegoanálisis. Sin embargo, también implica desafíos técnicos más complejos: no basta con construir y enviar paquetes desde cero, sino que se requiere la capacidad de interceptar, modificar y reenviar paquetes en tiempo real, todo ello sin invalidar las estructuras o semánticas propias del protocolo subyacente.

En sistemas Linux, este tipo de manipulación es posible gracias a Netfilter, un potente subsistema del núcleo que permite el filtrado, redirección y modificación de paquetes en tránsito. A través de reglas definidas con la herramienta iptables, es posible capturar determinados paquetes de red y desviarlos hacia una *cola de procesamiento* (Netfilter Queue), donde pueden ser analizados y manipulados por programas en espacio de usuario.

Desde Python, esta funcionalidad se puede implementar utilizando la librería NetfilterQueue, que proporciona una interfaz directa con las colas de Netfilter. Combinada con la potencia de Scapy, una herramienta de manipulación de paquetes, es posible interceptar paquetes específicos, modificar su contenido y devolverlos al núcleo para su reenvío, todo ello de forma transparente para los dispositivos involucrados en la comunicación original.

<br>
### Interceptar y modificar el tráfico de red

El subsistema Netfilter, integrado en el núcleo de Linux, proporciona una infraestructura poderosa para el filtrado y la manipulación de paquetes de red. Es el motor detrás de herramientas como iptables o nftables, y permite interceptar paquetes que entran, salen o atraviesan el sistema, aplicando decisiones como aceptar, rechazar, reenviar o redirigir dichos paquetes.

Uno de los componentes más relevantes de Netfilter para aplicaciones de esteganografía es la posibilidad de desviar paquetes a una **cola de procesamiento en espacio de usuario**, conocida como *Netfilter Queue*. En lugar de tomar una decisión directamente en el kernel, se puede enviar el paquete a esta cola especial, donde una aplicación en modo usuario puede inspeccionarlo, modificarlo e incluso decidir su destino final (aceptar, descartar, modificar, etc.).

Para utilizar esta funcionalidad, es necesario:

1. Crear una regla en iptables que redirija cierto tráfico a una cola específica.
2. Escribir un programa en Python que lea los paquetes de esa cola, los procese y los reenvíe.

La librería NetfilterQueue permite esta interacción con el espacio de usuario. Combinada con Scapy, nos permite trabajar con paquetes de red de manera detallada, decodificándolos, accediendo a sus campos y modificándolos fácilmente.

A continuación se muestra un ejemplo básico en el que capturamos todos los paquetes ICMP (como los generados por ping) y simplemente los aceptamos sin modificarlos. Este código ilustra el uso de NetfilterQueue en combinación con Python:

```python
from netfilterqueue import NetfilterQueue

def process_packet(packet):
    packet.accept()

nfqueue = NetfilterQueue()
nfqueue.bind(1, process_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
```

Para que este código funcione, debemos redirigir el tráfico que deseamos interceptar a la cola número 1 (como se indica en `nfqueue.bind(1, ...)`). Esto se hace utilizando el siguiente comando iptables:

```bash
iptables -A OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

Esta regla envía a la cola 1 todos los paquetes salientes de tipo ICMP. Cuando ejecutamos el script de Python, cada vez que se genera un paquete ICMP (por ejemplo, con el comando ping), este es interceptado y enviado a nuestra función `process_packet`.

Desde ahí, podemos inspeccionar el contenido del paquete, modificar campos o incluso descartar el paquete si lo deseamos (con `packet.drop()`). En este ejemplo simplemente imprimimos un mensaje y lo aceptamos para que continúe su camino.

Este mecanismo nos proporciona un control muy preciso sobre el tráfico de red en tiempo real, lo que lo convierte en una herramienta ideal para implementar técnicas de esteganografía activa, en las que la información oculta se inserta directamente dentro de una comunicación existente.

<br>
### Redirección a la cola de Netfilter

Para poder manipular paquetes en tiempo real desde un programa Python, primero debemos redirigirlos a una cola de Netfilter. Esta operación se realiza mediante la herramienta iptables, que permite definir reglas de filtrado y tratamiento de paquetes dentro del núcleo del sistema operativo. Cuando un paquete coincide con una de estas reglas, podemos indicarle que se desvíe a una cola numerada, lo que permite que un programa en espacio de usuario (como uno en Python que use la librería NetfilterQueue) lo capture, lo analice o lo modifique antes de decidir su destino.

<br>
### Reglas IPTABLES

Una regla básica que envía paquetes a una cola de Netfilter tiene la siguiente estructura:

```bash
iptables -I <CADENA> -p <PROTOCOLO> [FILTROS] \
    -j NFQUEUE --queue-num <NUM>
```

Los elementos principales de esta regla son:

- `-I <CADENA>`: Inserta la regla al principio de la cadena indicada. Las cadenas más habituales son `INPUT` (para tráfico entrante), `OUTPUT` (para tráfico saliente) y `FORWARD` (para tráfico que atraviesa el sistema hacia otro destino).
- `-p <PROTOCOLO>`: Especifica el protocolo que se desea filtrar. Los valores más comunes son `icmp`, `tcp` y `udp`.
- `[FILTROS]`: Opcionalmente, se pueden añadir filtros adicionales como dirección IP de origen o destino, puertos, interfaces, etc.
- `-j NFQUEUE --queue-num <NÚMERO>`: Indica que los paquetes deben enviarse a la cola de Netfilter con el número especificado.

**Ejemplos de redirección**:

A continuación se muestran algunos ejemplos de cómo redirigir distintos tipos de tráfico a la cola número 1:

- Redirigir tráfico ICMP saliente (por ejemplo, generado por ping):

```bash
iptables -I OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

- Redirigir tráfico TCP saliente hacia el puerto 80 (HTTP):

```bash
iptables -I OUTPUT -p tcp --dport 80 \
    -j NFQUEUE --queue-num 1
```

- Redirigir tráfico UDP entrante desde el puerto 53 (típicamente DNS):

```bash
iptables -I INPUT -p udp --sport 53 \
    -j NFQUEUE --queue-num 1
```

- Redirigir tráfico TCP entrante destinado al puerto 22 (SSH):

```bash
iptables -I INPUT -p tcp --dport 22 \
    -j NFQUEUE --queue-num 1
```

- Redirigir todo el tráfico UDP saliente:

```bash
iptables -I OUTPUT -p udp -j NFQUEUE --queue-num 1
```

- Redirigir tráfico entre dos direcciones IP específicas:

```bash
iptables -I FORWARD -p tcp \
    -s 192.168.1.100 -d 192.168.1.200 \
    -j NFQUEUE --queue-num 1
```

En el contexto de la esteganografía en redes, la elección de la cadena adecuada en iptables —ya sea `INPUT`, `OUTPUT` o `FORWARD`— depende del rol que desempeña el sistema en la comunicación. Si el sistema actúa como **destino del tráfico**, es decir, como **receptor**, se deben utilizar reglas en la cadena `INPUT`, que capturan los paquetes entrantes hacia el sistema. En cambio, si el sistema es el **emisor**, y genera directamente los paquetes que se quieren modificar, se debe usar la cadena `OUTPUT`, que gestiona el tráfico saliente desde el sistema hacia la red. Por otro lado, la cadena `FORWARD` solo debe emplearse cuando el sistema **actúa como intermediario**, es decir, cuando está encaminando tráfico entre dos redes distintas. En este caso, el sistema no es ni el emisor ni el receptor final, sino un nodo de paso que puede interceptar y modificar el tráfico en tránsito. Esta última opción resulta especialmente útil en escenarios de esteganografía, como los ataques tipo *man-in-the-middle* o en configuraciones donde se dispone de acceso a un enrutador del tráfico.

Todos estos comandos deben ejecutarse con privilegios de superusuario, ya que modifican la configuración del sistema. 

<br>
### Eliminación de reglas

Una vez terminada la ejecución del programa, es importante eliminar las reglas insertadas para restaurar la configuración original del sistema. Esto se puede hacer de las siguientes maneras:

- Eliminar una regla concreta usando la misma instrucción que la creó, pero reemplazando el parámetro `-I` por `-D`:

```bash
iptables -D OUTPUT -p icmp -j NFQUEUE --queue-num 1
```

- Listar todas las reglas con sus números de línea:

```bash
iptables -L -n --line-numbers
```

  Y luego eliminar la regla indicando su número en la cadena correspondiente:

```bash
iptables -D OUTPUT 1
```

En cualquier caso, es una buena práctica que el programa Python se asegure de limpiar las reglas que ha creado, incluso si ocurre un error o se interrumpe su ejecución. Esto se puede hacer, por ejemplo, con un bloque `try/finally`.

<br>
### Envío de mensajes modificando el tráfico

Una vez que sabemos redirigir el tráfico hacia una cola de Netfilter, podemos implementar un sistema que intercepte paquetes reales de una comunicación legítima y los modifique en tiempo real para incluir en ellos información oculta.

Este tipo de esteganografía es especialmente interesante porque no requiere que el emisor cree un canal nuevo, sino que aprovecha un canal ya existente, reduciendo así la probabilidad de ser detectado. Para lograrlo, es necesario que el emisor tenga acceso al tráfico que quiere modificar (por ejemplo, porque es el que lo genera o porque actúa como intermediario).

El proceso de envío consiste en tres pasos fundamentales:

1. Crear una regla de iptables que redirija el tráfico deseado (en este caso, paquetes ICMP) a una cola de Netfilter.
2. Interceptar estos paquetes en Python usando NetfilterQueue.
3. Modificar la carga útil del paquete o alguno de sus campos y reenviarlo tras recalcular los checksums.

En el siguiente ejemplo se modifica la carga útil de paquetes ICMP antes de que salgan del sistema. La regla de iptables intercepta los paquetes de salida ICMP hacia una dirección concreta, y el programa inserta el mensaje `"Hello world"` dentro del contenido del paquete.

```python
import subprocess
from netfilterqueue import NetfilterQueue
import scapy.all as scapy

QUEUE = 1
TARGET_IP = "192.168.1.100"

def handle_packet(packet):
    pkt = scapy.IP(packet.get_payload())
    if pkt.haslayer(scapy.ICMP):
        pkt[scapy.Raw].load = b"hello world"
        del pkt[scapy.IP].chksum
        del pkt[scapy.ICMP].chksum
        packet.set_payload(bytes(pkt))
    packet.accept()

def iptables_rule(enable, dst_ip):
    action = "-I" if enable else "-D"
    cmd = [
        "iptables", action, "OUTPUT",
        "-p", "icmp", "-d", dst_ip,
        "-j", "NFQUEUE", "--queue-num", str(QUEUE)
    ]
    subprocess.call(cmd)

def run_queue():
    nfq = NetfilterQueue()
    nfq.bind(QUEUE, handle_packet)
    try:
        nfq.run()
    except KeyboardInterrupt:
        nfq.unbind()

iptables_rule(True, TARGET_IP)
try:
    run_queue()
finally:
    iptables_rule(False, TARGET_IP)
```

Este programa redirige todo el tráfico ICMP saliente hacia la IP especificada en la variable `target_ip`, lo intercepta, inserta un mensaje en su interior y lo deja continuar su curso. El paquete modificado conserva su estructura y se recalculan las sumas de verificación para evitar errores al ser procesado por el sistema receptor.

**Importante**: En este ejemplo estamos modificando el *payload* generado por la herramienta ping, por lo que, en muchas implementaciones, esta dejará de funcionar correctamente. Debe tenerse en cuenta que este ejemplo tiene únicamente fines ilustrativos, con el objetivo de mostrar cómo se realiza la interceptación y modificación de paquetes.

<br>
### Recepción del mensaje

El receptor de la comunicación no necesita interceptar ni modificar el tráfico. Su tarea es únicamente analizar el tráfico entrante y extraer los mensajes ocultos. En este ejemplo, el receptor observa el tráfico ICMP y extrae la parte útil de la carga de los paquetes para recuperar el mensaje.

Esto se puede realizar fácilmente con la librería `scapy` y la función `sniff()`, que permite capturar paquetes de red en tiempo real. En este caso, filtramos únicamente los paquetes ICMP del tipo `echo-request` (que son los que el emisor ha modificado) y extraemos los datos del campo `Raw`.

```python
from scapy.all import *

def capture(packet):
    if packet.haslayer(Raw):
        msg = packet[Raw].load
        print(f"Message: {msg}")

sniff(filter="icmp and icmp[icmptype] == icmp-echo", 
      prn=capture)
```

Este programa puede ejecutarse directamente en el sistema receptor. Escucha los paquetes ICMP que llegan a la máquina y, si alguno contiene una carga útil, la imprime por pantalla. En el ejemplo anterior, cuando el emisor inserta la cadena `"Hello world"`, el receptor podrá verla directamente en su salida estándar.

Para probar el programa basta con ejecutar la herramienta *ping* y el programa que intercepta y modifica los paquetes en un host y ejecutar el código de recepción del mensaje en otro cost. Si no se ejecuta el programa que intercepta e incrusta el mensaje, el receptor imprimira algo como lo siguiente:

```bash
Message: b'/\xe2\xe3g\x00\x00\x00\x00\xd4\xf2\t\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./01234567'
Message: b'0\xe2\xe3g\x00\x00\x00\x00\x8aP\n\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./01234567'
Message: b'1\xe2\xe3g\x00\x00\x00\x00T\xae\n\x00\x00\x00\x00\x00\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./01234567'
...
```

Sin embargo, en cuanto iniciemos el programa de interceptación e incrustación el receptor mostrará lo siguiente:

```bash
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
Message: b'hello world\x00\x00\x00\x00\x00\x00\x00'
...
```

Nótese que, en cuanto se inicie el programa que modifica el tráfico, la herramienta ping puede dejar de responder, ya que, como se ha indicado anteriormente, muchas implementaciones de ping verifican el contenido del *payload*.

<br>
## Modificación de paquetes

<br>
### El equilibrio de la modificación

En capítulos anteriores vimos que es posible añadir información oculta en los paquetes de red. No obstante, esto puede resultar peligroso: si no se hace correctamente, la alteración puede ser evidente o incluso romper el protocolo.

Los protocolos están cuidadosamente definidos, muchas veces a través de documentos RFC. Esto significa que cualquier desviación puede ser detectada con facilidad por herramientas automáticas de análisis de red. Para mantener la comunicación encubierta libre de sospechas, es necesario respetar la estructura y comportamiento habitual de cada protocolo.

Por lo tanto, en lugar de añadir información, podemos aprovechar campos ya existentes dentro de ciertos protocolos que permiten una mínima modificación sin consecuencias visibles. Es decir, ocultamos información en valores que ya deberían cambiar de forma natural.

<br>
### Alterando las marcas de tiempo en TCP

El protocolo TCP, base de gran parte de la comunicación en redes, permite la inclusión de opciones adicionales. Una de ellas es la opción de marca de tiempo (Timestamp), definida por dos valores de 32 bits: `TSval` y `TSecr`.

- **TSval**: valor actual de tiempo enviado por el emisor.
- **TSecr**: valor más reciente de `TSval` recibido, reenviado por el receptor.

Estos campos son útiles para calcular el tiempo de ida y vuelta, optimizar el control de congestión, y más. Lo interesante es que pequeños cambios en `TSval` no afectan negativamente a la conexión, ni son fácilmente detectables. Esto los convierte en una excelente oportunidad para insertar información sin levantar sospechas.

<br>
### Ejemplo práctico: inserción en TSval

Para este ejemplo ocultaremos un mensaje binario dentro de una conexión SSH (puerto TCP 22), interceptando los paquetes salientes y modificando el bit menos significativo de `TSval` según el mensaje que deseamos enviar.

El script utiliza iptables para redirigir los paquetes a una cola de Netfilter, que será procesada desde Python con Scapy.

```python
import subprocess
from netfilterqueue import NetfilterQueue
import scapy.all as scapy

QUEUE = 1
TARGET_IP = "192.168.1.2"
TARGET_PORT = "22"
TEXT = "hello world"

def encode_message(text):
    bits = [int(b) for c in text.encode() \
        for b in format(c, '08b')]
    return [1]*8 + bits + [0]*8

bitstream = encode_message(TEXT)
bit_index = 0

def embed_data(packet):
    global bit_index
    pkt = scapy.IP(packet.get_payload())

    if (pkt.haslayer(scapy.TCP) and 
        pkt[scapy.IP].dst == TARGET_IP and 
        pkt[scapy.TCP].dport == int(TARGET_PORT) ):
        options = []
        for opt in pkt[scapy.TCP].options:
            if ( opt[0] == 'Timestamp' and 
                 bit_index < len(bitstream) ):
                tsval, tsecr = opt[1]
                bit = bitstream[bit_index]
                if tsval % 2 != bit:
                    tsval += 1
                options.append(('Timestamp', (tsval,tsecr)))
                print("sent:", bit)
                bit_index += 1
            else:
                options.append(opt)

        pkt[scapy.TCP].options = options
        del pkt[scapy.IP].chksum
        del pkt[scapy.TCP].chksum
        packet.set_payload(bytes(pkt))

    packet.accept()

def set_iptables(enable):
    action = "-I" if enable else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "tcp", "-d", TARGET_IP,
        "--dport", TARGET_PORT,
        "-j", "NFQUEUE",
        "--queue-num", str(QUEUE)
    ])


set_iptables(True)
queue = NetfilterQueue()
queue.bind(QUEUE, embed_data)
try:
    queue.run()
except KeyboardInterrupt:
    pass
finally:
    queue.unbind()
    set_iptables(False)
```

<br>
### Extracción del mensaje en el receptor

El receptor simplemente inspecciona el bit menos significativo de cada `TSval` recibido para reconstruir el mensaje.

```python
from scapy.all import sniff, TCP

START = [1]*8
END = [0]*8

def extract_bit(tsval):
    return tsval % 2

def decode_bits(bits):
    chars = [chr(int(''.join(str(b) for b in bits[i:i+8]), 2)) \
            for i in range(0, len(bits), 8)]
    return ''.join(chars)

def process(packet):
    if packet.haslayer(TCP):
        options = packet[TCP].options
        for opt in options:
            if opt[0] == 'Timestamp':
                tsval = opt[1][0]
                bit = extract_bit(tsval)
                process.bit_buffer.append(bit)
                print("Received:", bit)

                if not process.sync:
                    if process.bit_buffer[-8:] == START:
                        print("[+] START")
                        process.sync = True
                        process.msg_bits = []
                else:
                    if process.bit_buffer[-8:] == END:
                        print("[+] END")
                        message = \
                            decode_bits(process.msg_bits)
                        print("Message:", message)
                        process.sync = False
                        process.msg_bits = []
                    else:
                        process.msg_bits.append(bit)
process.bit_buffer = []
process.sync = False
process.msg_bits = []

sniff(filter="tcp and dst port 22", prn=process)
```

<br>
### Cómo realizar una prueba práctica

Para probar este canal encubierto, es necesario contar con una máquina que tenga un servidor SSH en funcionamiento, ya que este es el tipo de tráfico que se va a utilizar como portador del mensaje oculto.

Primero se deben ejecutar ambos programas: el emisor, que se encarga de interceptar y modificar el tráfico en tiempo real, y el receptor, que analiza los paquetes para extraer el mensaje oculto. Una vez en marcha, se inicia una conexión SSH hacia la máquina objetivo. Esta conexión generará tráfico que será interceptado y modificado por el emisor, permitiendo incrustar los bits del mensaje en los campos de los paquetes TCP.

En la terminal del emisor podremos observar una salida similar a la siguiente:

```bash
sent: 1                                       
sent: 1                                       
sent: 1                                       
sent: 1                                       
...                                      
sent: 0                                       
sent: 0                                       
sent: 0                                       
sent: 0 
```

Mientras que en el receptor, veremos algo como esto:

```bash
...
Received: 1                                     
Received: 1                                     
[+] START                                      
...                                      
Received: 0
Received: 0
Received: 0
[+] END
Message: hello world
Received: 0
Received: 0
Received: 1
...
```

<br>
### Consideraciones y mejoras posibles

Aunque este método es simple y eficaz, puede presentar ciertos riesgos:

- El receptor legítimo (como SSH) podría notar discrepancias entre los valores de `TSval` y `TSecr`.
- Herramientas de análisis de tráfico podrían detectar valores inconsistentes.

Una mejora evidente sería interceptar también los paquetes de retorno, ajustando `TSecr` para que coincida con el `TSval` modificado, cerrando así el canal de detección.

Además, se podría explorar la inserción de múltiples bits usando los dos (o más) bits menos significativos de `TSval`, aunque esto aumentaría el riesgo de ser detectado.

La modificación de campos existentes en protocolos estándar es una vía muy efectiva para la esteganografía en red, siempre que se respeten los márgenes de variabilidad del protocolo y se actúe con precaución.

<br>
### Otras posibilidades de modificación

El uso del campo `TSval` en TCP como canal para la ocultación de información es solo una de las muchas posibilidades que existen dentro de la esteganografía basada en la modificación de cabeceras de protocolos. Existen otros campos, tanto en el nivel IP como en TCP, que pueden ser utilizados con fines similares, siempre que su modificación no afecte al funcionamiento normal de la comunicación.

En el protocolo IP, un candidato frecuente es el campo de *Identificación* (ID), utilizado tradicionalmente para el ensamblaje de fragmentos. En conexiones donde no se emplea la fragmentación —lo cual es habitual en redes modernas— este campo puede presentar valores arbitrarios sin consecuencias visibles, permitiendo su uso como portador de bits ocultos.

Dentro del protocolo TCP, además del campo `TSval`, también es posible explorar otros elementos de la cabecera como los números de secuencia o el campo de ventana de recepción. Aunque estos campos están más estrechamente ligados al control de flujo y al funcionamiento interno del protocolo, pequeñas variaciones en sus valores, cuidadosamente seleccionadas, podrían pasar desapercibidas en ciertos contextos.

En resumen, la modificación de campos de cabecera constituye una estrategia viable y eficaz para la esteganografía en red, siempre que se tenga un conocimiento profundo del protocolo en cuestión y se respeten sus márgenes de tolerancia. El éxito de estas técnicas depende de que los cambios se mantengan dentro de los valores esperados por las aplicaciones y sistemas que procesan los paquetes, evitando así que sean descartados o que levanten sospechas.

<br>
## Retrasos en la transmisión

<br>
### Retrasos como canal de comunicación

Modificar directamente los paquetes de red para ocultar información puede ser efectivo, pero también implica riesgos considerables. Los protocolos de red están definidos con un alto grado de precisión, y sus campos cumplen funciones específicas. Por ello, cualquier alteración anómala puede ser detectada fácilmente por herramientas de monitoreo o sistemas de seguridad.

Ante esta limitación, una alternativa más sutil es no tocar el contenido del paquete, sino el momento en que se envía. Esta estrategia se basa en introducir retrasos cuidadosamente diseñados entre el envío de paquetes consecutivos. Dichos intervalos pueden codificar bits de información, como por ejemplo: un intervalo corto representa un '0', y uno largo representa un '1'.

La ventaja clave de esta técnica es que no altera la estructura del paquete ni su carga útil. El canal oculto reside únicamente en el tiempo de transmisión, lo cual lo hace más difícil de detectar mediante inspección directa del contenido.

Sin embargo, esta técnica también presenta desafíos. Los retrasos deben ser suficientemente pequeños para no afectar la calidad de la comunicación, pero lo bastante distintos para que puedan diferenciarse en el receptor. Además, la red introduce su propia variabilidad en los tiempos, lo que puede interferir con la precisión de los bits transmitidos.

<br>
### Retrasos en ICMP

Para ilustrar esta técnica, usaremos el comando ping, que genera paquetes ICMP de forma periódica. Nuestro objetivo será modificar el momento de salida de estos paquetes para insertar un mensaje binario.

La idea es sencilla: si queremos enviar un '1', introduciremos un retraso antes de permitir que el paquete salga. Si queremos enviar un '0', no introducimos ningún retraso. El receptor podrá distinguir entre ambos valores midiendo el tiempo entre llegadas.

```python
import os
import time
import subprocess
from netfilterqueue import NetfilterQueue

QUEUE = 1
TARGET_IP = "192.168.1.100"
TEXT = "hello world"

def encode_message(text):
    bits = [int(b) for c in text.encode() for b in format(c, '08b')]
    return [1]*8 + bits + [0]*8

bitstream = encode_message(TEXT)
bit_index = 0

def handle_packet(packet):
    global bit_index
    if bit_index < len(bitstream):
        bit = bitstream[bit_index]
        print("sent:", bit)
        if bit == 1:
            time.sleep(2)
        bit_index += 1
    packet.accept()

def set_iptables(enable):
    action = "-I" if enable else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "icmp", "-d", TARGET_IP,
        "-j", "NFQUEUE", "--queue-num", str(QUEUE)
    ])

set_iptables(True)
nfqueue = NetfilterQueue()
nfqueue.bind(QUEUE, handle_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
finally:
    set_iptables(False)
```

El código es prácticamente idéntico al de ejemplos anteriores. La clave está en las líneas donde introducimos una pausa de dos segundos si el bit a enviar es un '1'.

<br>
### Extracción del mensaje en el receptor

En el receptor, simplemente medimos el tiempo entre la llegada de paquetes. Si la diferencia entre uno y otro es superior a 1.5 segundos, consideramos que se ha transmitido un '1'. Si es inferior, interpretamos un '0'. A continuación, se muestra el código del receptor:

```python
import time
from scapy.all import sniff, Raw

START_MARK = [1]*8
END_MARK = [0]*8
THRESHOLD = 1.5

last_time = None
bit_buffer = []
sync = False
message_bits = []

def extract_bit(current_time):
    global last_time
    delta = current_time - last_time
    return 1 if delta > THRESHOLD else 0

def decode_bits(bits):
    chars = [
        chr(int(''.join(map(str, bits[i:i+8])), 2))
        for i in range(0, len(bits), 8)
    ]
    return ''.join(chars)

def handle_packet(packet):
    global last_time, bit_buffer, sync, message_bits
    now = time.time()
    if last_time is None:
        last_time = now
        return
    bit = extract_bit(now)
    bit_buffer.append(bit)
    print("recv:", bit)
    last_time = now

    if not sync:
        if bit_buffer[-8:] == START_MARK:
            print("[+] START")
            sync = True
            message_bits = []
    else:
        if bit_buffer[-8:] == END_MARK:
            print("[+] END")
            message = decode_bits(message_bits)
            print("Message:", message)
            sync = False
            message_bits = []
        else:
            message_bits.append(bit)

sniff(
    filter="icmp and icmp[icmptype] == icmp-echo and dst 192.168.1.100",
    prn=handle_packet
)
```

<br>
### Cómo poner a prueba el canal de tiempo

Para realizar una prueba práctica, se necesitan dos instancias o contenedores (emisor y receptor), y dos terminales en el emisor. En el primer terminal se ejecuta el comando ping, y en el segundo se ejecuta el script que intercepta los paquetes y decide si se introducen retrasos.

```bash
sent: 1                                       
sent: 1                                       
sent: 1                                       
sent: 1                                       
...                                      
sent: 0                                       
sent: 0                                       
sent: 0                                       
sent: 0 
```

```bash
recv: 1                                      
recv: 1                                      
recv: 1                                      
recv: 1                                      
[+] START                                    
recv: 0                                      
recv: 1                                      
recv: 1                                      
recv: 0            
...
recv: 0
recv: 0
recv: 0
[+] END
Message: hello world
recv: 0
recv: 0
recv: 0
recv: 0
...
```

Si detenemos el script que introduce los retrasos, todos los bits extraídos serán ceros, lo que confirma que el canal oculto depende exclusivamente del control de tiempos.

<br>
### Aspectos a considerar

Esta técnica puede parecer muy disimulada, pero no es infalible. Si bien no altera los paquetes directamente, los patrones de tiempo sí pueden ser detectados por herramientas que analicen flujos de red. Especialmente si los retrasos son grandes o tienen una periodicidad sospechosa.

Una forma de reducir el riesgo es disminuir los tiempos de espera y utilizar diferencias más sutiles. Sin embargo, esto vuelve el canal más vulnerable al ruido introducido por la propia red, dificultando la recuperación del mensaje.

**Conclusión:** La manipulación del tiempo de envío entre paquetes es una técnica poderosa, pero debe utilizarse con cautela. Un equilibrio adecuado entre retraso, capacidad de transmisión y resistencia al ruido es clave para que el canal siga siendo útil y discreto.

<br>
## Reordenamiento de datagramas

<br>
### Reordenar en lugar de modificar

A diferencia de TCP, el protocolo UDP no garantiza ni la entrega ni el orden de llegada de los datagramas. Esta característica, que en otros contextos puede parecer una limitación, se convierte en una oportunidad para la esteganografía.

En este contexto, la técnica consiste en alterar intencionadamente el orden de envío de datagramas UDP para codificar bits de información. El emisor y el receptor deben estar previamente de acuerdo en la codificación: por ejemplo, enviar dos paquetes en orden indica un '0', y enviarlos en orden inverso indica un '1'.

Este método tiene la ventaja de no modificar el contenido de los paquetes, lo que dificulta su detección mediante análisis de contenido. Sin embargo, también es más sensible a errores: si la red introduce una reordenación adicional o se pierde un paquete, la información puede corromperse.

Además, los patrones de tráfico resultantes pueden ser inusuales y llamar la atención de un sistema de detección si no se emplea con cautela.

<br>
### Ejemplo práctico: emisor de datagramas reordenados

Para codificar un mensaje, interceptaremos los datagramas enviados desde el emisor al puerto UDP 5000, utilizando iptables y NetfilterQueue. Procesaremos los paquetes en parejas: si el bit a codificar es un 0, se dejan en el orden original; si es un 1, se invierten antes de ser reenviados.

Muchos protocolos de *streaming* utilizan UDP, ya que prefieren velocidad frente a fiabilidad. Esto hace que el protocolo sea un candidato ideal para técnicas de esteganografía como esta.

En nuestro caso, usaremos la herramienta Netcat para enviar secuencias de datagramas UDP, y pondremos un identificador en el *payload* para poder comprobar el orden en el receptor.

```bash
root@emisor:/toi# for i in `seq 10`; do
> echo $i | nc -q 1 -u 172.17.0.3 5000
> done
```

Código del emisor:

```python
import os
import subprocess
from netfilterqueue import NetfilterQueue
from scapy.all import IP, UDP

target_ip = "172.17.0.3"
target_port = "5000"
message = [0, 0, 0, 1]
message_idx = 0
packets = []

def release_packets():
    global message_idx
    if packets:
        if message[message_idx % len(message)] == 1:
            packets.reverse()
            print("send 1")
        else:
            print("send 0")

        message_idx += 1
        for pkt in packets:
            pkt.accept()

def process_packet(packet):
    global packets
    scapy_packet = IP(packet.get_payload())
    if scapy_packet.haslayer(UDP):
        packets.append(packet)
        if len(packets) == 2:
            release_packets()
            packets = []

def modify_iptables(add, target_ip):
    action = "-I" if add else "-D"
    subprocess.call([
        "iptables", action, "OUTPUT",
        "-p", "udp",
        "-d", target_ip,
        "--dport", target_port,
        "-j", "NFQUEUE",
        "--queue-num", "1"
    ])

modify_iptables(True, target_ip)
nfqueue = NetfilterQueue()
nfqueue.bind(1, process_packet)

try:
    nfqueue.run()
except KeyboardInterrupt:
    nfqueue.unbind()
finally:
    modify_iptables(False, target_ip)
```

<br>
### Extracción del mensaje en el receptor

El receptor procesa los paquetes de dos en dos y compara el orden de sus identificadores. Si el segundo paquete tiene un número mayor, se interpreta como un '0'; si es menor, como un '1'. Aquí tienes el código correspondiente:

```python
from scapy.all import *

last_payload = None

def process_packet(packet):
    global last_payload
    if packet.haslayer(UDP):
        payload = packet[Raw].load.decode('utf-8', 'ignore').strip()
        print(f"{packet[IP].src}:{packet[UDP].sport} -> "
              f"{packet[IP].dst}:{packet[UDP].dport} {payload}")

        if last_payload:
            if int(last_payload) > int(payload):
                print("bit 1")
            else:
                print("bit 0")
            last_payload = None
        else:
            last_payload = payload

sniff(filter="udp and port 5000", prn=process_packet)
```

<br>
### Cómo hacer la prueba

Para probar esta técnica, necesitas tres terminales: dos en el emisor y uno en el receptor.

- **Terminal 1 del emisor:** Ejecuta el script de ocultación.

```bash
root@emisor:/toi# python3 shared/emisor.py
send 0
send 0
send 0
send 1
```

- **Terminal 2 del emisor:** Envía los datagramas con Netcat.

```bash
root@emisor:/toi# for i in `seq 8`; do echo $i | nc -q 1 -u 172.17.0.3 5000; done
```

- **Terminal del receptor:** Ejecuta el script de recepción.

```bash
root@receptor:/toi# python3 shared/receptor.py
172.17.0.2:53421 -> 172.17.0.3:5000  1
172.17.0.2:43061 -> 172.17.0.3:5000  2
bit 0
...
172.17.0.2:39040 -> 172.17.0.3:5000  8
172.17.0.2:46846 -> 172.17.0.3:5000  7
bit 1
```

Importante: los paquetes no se procesan hasta que se envían desde el terminal 2, por lo tanto, este debe ejecutarse al final.

<br>
### Análisis y posibilidades de mejora

Una cuestión interesante es cuánta información se puede ocultar por cada grupo de paquetes. La respuesta la da la entropía: si usamos $n$ paquetes, hay $n!$ formas de ordenarlos, por lo que podemos ocultar hasta $\log_2(n!)$ bits por grupo.

- Con 2 paquetes: $2! = 2$ combinaciones $\Rightarrow \log_2(2) = 1$ bit.
- Con 3 paquetes: $3! = 6$ combinaciones $\Rightarrow \log_2(6) \approx 2.58$ bits.
- Con 4 paquetes: $4! = 24$ combinaciones $\Rightarrow \log_2(24) \approx 4.58$ bits.

Esto demuestra que la capacidad del canal puede incrementarse agrupando más paquetes, aunque a costa de mayor complejidad, latencia y detectabilidad.

Por otro lado, en redes reales los paquetes UDP pueden llegar desordenados debido a la propia dinámica de la red, lo que puede interferir con la recepción correcta del mensaje. Se pueden implementar mecanismos de corrección o codificación redundante para mitigar estos problemas.

**Conclusión:** El reordenamiento de datagramas UDP es una técnica efectiva y discreta para ocultar información, siempre que se controle el entorno de red y se utilice con moderación.

<br>
## Implicaciones y desafíos

Las técnicas de esteganografía en protocolos de red abren una puerta interesante y poderosa para la comunicación encubierta, especialmente en entornos donde el uso de archivos multimedia podría levantar sospechas o estar restringido. Sin embargo, la utilización de estas técnicas no está exenta de implicaciones técnicas, operativas y de seguridad que deben ser cuidadosamente consideradas.

Por un lado, hemos comprobado que es posible insertar información dentro de tráfico legítimo utilizando modificaciones mínimas sobre campos poco sensibles (como las marcas de tiempo en TCP), controlando los tiempos de transmisión (retrasos en ICMP) o manipulando el orden de envío de datagramas (reordenamiento en UDP). Estos métodos, si se aplican con sutileza y conocimiento del protocolo, pueden ser altamente efectivos y difíciles de detectar.

No obstante, cada técnica conlleva sus propios desafíos:

- **Compatibilidad y estabilidad**: muchas de estas estrategias requieren acceso privilegiado al sistema operativo y un conocimiento preciso de cómo opera el protocolo subyacente. Un cambio inapropiado puede romper la comunicación o ser detectado fácilmente.
- **Riesgo de detección**: aunque estas técnicas evitan modificar el contenido visible de los datos, patrones anómalos en el comportamiento del tráfico (como variaciones temporales poco naturales o secuencias de paquetes inconsistentes) pueden ser detectados por sistemas de inspección profunda (DPI) o análisis estadístico.
- **Entorno de red**: la fiabilidad de estos canales encubiertos depende en gran medida del tipo de red. Redes con alta latencia, fluctuaciones o pérdidas frecuentes de paquetes (como en redes inalámbricas o sobre Internet) pueden interferir con la transmisión del mensaje oculto, especialmente en técnicas basadas en tiempo o orden.
- **Capacidad vs. indetectabilidad**: cuanto más contenido queramos transmitir, mayor es el riesgo de exposición. Encontrar el equilibrio adecuado entre tasa de datos y discreción es uno de los retos fundamentales en la esteganografía en red.

Desde un punto de vista práctico, el uso de herramientas como Scapy y NetfilterQueue nos ha demostrado que es técnicamente viable interceptar y modificar paquetes en tiempo real, abriendo posibilidades no solo para la ocultación de datos, sino también para la experimentación con técnicas defensivas y ofensivas en entornos de red controlados.

En última instancia, la esteganografía en protocolos de red no es simplemente una colección de técnicas aisladas, sino un campo que requiere comprender profundamente la naturaleza del tráfico, sus variaciones normales, y cómo insertar alteraciones que pasen desapercibidas. A medida que las herramientas de análisis y detección evolucionan, también lo deben hacer las estrategias esteganográficas.

