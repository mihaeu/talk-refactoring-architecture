
Dieses Projekt stellt das Standard-TNG-Präsentations-Template bereit.

## Start der Präsentation

Voraussetzung für das Projekt ist lediglich eine Node.js-Installation:

```
sudo apt-get install nodejs     # Linux mit Aptitude
brew install nodejs             # Mac OS X mit Brew
choco install nodejs            # Windows mit Chocolatey
```

Das Template kann auf mehrere Arten geladen werden:
- Man kann dieses Git-Repository klonen
- Man kann sich das Template aber auch über NPM direkt herunterladen, ohne ein Git-Repository auszuchecken

### Download über Git

Über Git muss einfach nur dieses Repository geklont werden.

```
git clone ssh://git@bitbucket.int.tngtech.com:122/rpt/presentation-template.git
cd presentation-template
npm install
```

### Installation über NPM

Man legt sich zunächst ein leeres Verzeichnis an, in das man wechselt und daraufhin ein Package-Template lädt:

Dies kann komplett über die Kommandozeile geschehen (Linux, Mac OS, Cygwin, etc.):

```
git archive --remote=ssh://git@bitbucket.int.tngtech.com:122/rpt/presentation-template-develop.git --format tar master resources/other/presentation-package.json | tar -x && mv resources/other/presentation-package.json package.json && rmdir resources/other/ && rmdir resources/
npm install
```

Man kann die Datei aber auch über die Weboberfläche laden:

Folgende Datei kann heruntergeladen und als Datei "package.json" abgespeichert werden:

https://bitbucket.int.tngtech.com/projects/RPT/repos/presentation-template-develop/raw/resources/other/presentation-package.json?at=refs%2Fheads%2Fmaster

Daraufhin kann man auch hier die Abhängigkeiten installieren:
```
npm install
```

### Ausführung

Anschließend kann der Server mittels folgendem Befehl gestartet werden:

```
npm start
```

Nun kann im Browser zu "http://localhost:8000" navigiert werden.

## Start der Präsentation ohne Server

Ein Server ist nicht nötig, falls der Browser mit der Möglichkeit zu File Access gestartet wird:

```
chrome --allow-file-access-from-files
firefox                                 # Dateizugriff funktioniert auch ohne Parameter
```

Per Navigation zu "file://{PATH_ON_FILE_SYSTEM}" kann dann die Präsentation aufgerufen werden.

Live Editing ist in diesem Fall allerdings nicht möglich.
Falls die entsprechenden Folien aus der Präsentation entfernt werden, versucht der Browser auch nicht mehr,
eine Websocket-Verbindung aufzubauen.

## Wie entwerfe ich eine Präsentation?

Die initiale Präsentation zeigt direkt anhand von Beispielen, wie die einzelnen Plugins zu bedienen sind.
Die entsprechenden Folien können für die eigene Präsentation kopiert und abgewandelt werden.