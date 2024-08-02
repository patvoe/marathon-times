# Marathon Times of the World's Elite Keep Getting Faster

**What I aimed to accomplish**:\
In this project, I wanted to apply what I learned in the third part of the LEDE program, specifically trying out browser automation and animating a D3 chart. Given the current Olympic Games, I took a closer look at the development of marathon times. In 2023, new records were set in both the men's and women's marathon. Are these recent records just outliers, or is there a trend toward faster times? A data analysis aims to provide answers to this questionand and show possible trends.

**Findings**:\
I found out that the recent records are not outliers, as shown by the data from the World Athletics (WA). The times of the 100 fastest men in the marathon have significantly improved over the past 20 years. While the fastest men needed an average of 2:09:43 to cover the 42.195 kilometers in 2004, today it takes only 2:05:27. That's 4 minutes and 16 seconds less. The difference is even greater among women. While the 100 fastest women needed an average 2:28:41 in 2004, today it takes only 2:21:14. That's 7 minutes and 27 seconds less. The data also shows that today, runners from countries like Kenya and Ethiopia dominate the sport. Of the 100 fastest times men and woman, almost 70 percent (137) were set by athletes from Ethiopia or Kenya. Especially Ethiopia is a rising star in the marathon scene in the last two decade.

**Data collection**:\
The data I used:

- combined_men_2004-2024.csv
- combined_woman_2004-2024.csv

All Data where collected from the World Athletics (WA) federation Website.

I collected the data of the 100 fastest men's and women's times for the years 2004 to 2023 from the <a href="https://worldathletics.org/records/toplists/road-running/marathon/all/women/senior/2024?regionType=world&page=1&bestResultsOnly=true&maxResultsByCountry=all&eventId=10229534&ageCategory=seniors">World Athletics (WA) federation</a> and combined them in a Jupyter notebook to analyze the data.

**Data analysis**:\
I used Playwright for browser automation to save a list of the 100 fastest runners per year and gender as a CSV file from the World Athletics website. This saved me from manually downloading data for all twenty years for each gender. I then combined all the years into a single DataFrame to analyze the data as a complete time series. For comparing the running times, I had to convert the times from HH:MM:SS to seconds. Additionally, I needed extra columns such as the year or ISO country code uniformly in my DataFrame for analysis or visualization purposes. For displaying the flags in the Datawrapper tooltip, for example, I needed the ISO country code in ISO alpha-3 format. To reformat country codes, the Python library "pycountry" can be used, which provides access to the ISO 3166-1 country database.

**Summary, Challenges, Skills**:\
The application of browser automation using Playwright worked very well for automatically collecting the lists, saving me a lot of manual work. Fortunately, the use case was not too complex either.

The D3 animation of the running times cost me a lot of time and nerves. It was particularly difficult to stop the animation for defined groups. For example, when the first man reaches the finish line, only the male runners in the animation should stop. In the end, I find the animation less impressive/exciting than I initially thought. In a publication, I might even omit it. However, it was still a good exercise for me in animating a D3 chart.
