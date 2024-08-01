# Marathon Times of the World's Elite Keep Getting Faster

**What I aimed to accomplish**:\
In diesem Projekt wollte ich neu gelerntes aus der dritten Hälfte des Lede-Programms anwenden. Sprich einen Browser-Automatisierung ausprobieren und einen D3-Chart animieren. Aufgrund der aktuellen olympischen Spiele habe ich mir die Entwicklung der Marathonzeiten etwas genauer angeschaut. Auf der Marathonstrecke wurden im Jahr 2023 bei den Männern wie auch bei Frauen neue Rekorde aufgestellt. Sind diese jüngsten Rekorde nur Ausreisser, oder gibt es einen Trend zu immer schnelleren Zeiten? Eine Datenanalyse soll die Entwicklung sowie einen möglichen Trend.

**Findings**:\
I found out that the recent records are not outliers, as shown by the data from the World Athletics (WA). The times of the 100 fastest men in the marathon have significantly improved over the past 20 years. While the fastest men needed an average of 2:09:43 to cover the 42.195 kilometers in 2004, today it takes only 2:05:27. That's 4 minutes and 16 seconds less. The difference is even greater among women. While the 100 fastest women needed an average 2:28:41 in 2004, today it takes only 2:21:14. That's 7 minutes and 27 seconds less. The data also shows that today, runners from countries like Kenya and Ethiopia dominate the sport. Of the 100 fastest times men and woman, almost 70 percent (137) were set by athletes from Ethiopia or Kenya. Especially Ethiopia is a rising star in the marathon scene in the last two decade.

**Data collection**:\
The data I used:

- combined_men_2004-2024.csv
- combined_woman_2004-2024.csv

All Data where collected from the World Athletics (WA) federation Website. 

I collected the data of the 100 fastest men's and women's times for the years 2004 to 2023 from <a href="https://worldathletics.org/records/toplists/road-running/marathon/all/women/senior/2024?regionType=world&page=1&bestResultsOnly=true&maxResultsByCountry=all&eventId=10229534&ageCategory=seniors">the World Athletics (WA) federation</a> and combined them in a Jupyter notebook.

**Data analysis**:\
Ich nutzte Playwright für die Browser-Automatisierung, um eine Liste mit den 100 schnellsten Läufern pro Jahr und Geschlecht als CSV-File von der World-Athletic Webseite abzuspeichern. Dies ersparte mir das händische downloaden aller zwanzig Jahren pro Geschlecht. Anschliessend fügte ich alle Jahre zu einem Dataframe zusammen, um die Daten als komplette Zeitreihe zu analysieren. Für den Vergleich der Laufzeiten, musste ich die Zeiten von HH:MM:SS in Sekunden umwandeln. Zudem brauchte ich für die Analyse oder für die Visualisierung zusätzliche Spalten wie das Jahr oder den ISO-Ländercode einheitlich in meinem Dataframe. Für die Darstellung der Flaggen im Datawrapper-Tooltip brauchte ich beispielsweise den ISO-Ländercode im ISO alpha-3 Format. Für die Umformatierung von Ländercodes gibt es die Python-Library «pycountry», welche Zugriff auf ISO 3166-1 Länderdatenbank ermöglicht.

**Summary, Challenges, Skills**:\
Die Anwendung der Browser-Automatisierung mithilfe Playwright funktionierte für die automatische Sammlung der Listen sehr gut und ich konnte mir viel manuelle Arbeit sparen. Der Anwendungsfall war aber glücklicherweise auch nicht allzu komplex.

Die D3-Animation der Laufzeiten hat mich viel Zeit und Nerven gekostet. Besonders schwierig war es die Animation nach definierten Gruppen zu stoppen. Sprich wenn der erste Mann das Ziel erreicht, dann sollen nur die männlichen Läufer in der Animation anhalten. Schlussendlich finde ich die Animation weniger eindrücklich/spannend, als ich anfänglich gedacht hatte. Bei einer Publikation würde ich sie allenfalls sogar streichen. Es war aber dennoch eine gute Übung für die Animation eines D3-Charts für mich.