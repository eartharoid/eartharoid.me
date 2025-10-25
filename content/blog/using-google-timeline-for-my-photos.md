---
# title: "How I added location data to old photos using Google Maps Timeline" # too long
title: "Adding location data to photos with Google Maps Timeline"
date: 2023-08-29T01:05:57+01:00
draft: false
hero: '/cdn-cgi/image/height=1080,quality=75,format=avif/https://static.eartharoid.me/my-photos/misc/IMG_9612.JPG'
images:
  - '/cdn-cgi/image/height=1080,quality=75,format=avif/https://static.eartharoid.me/my-photos/misc/IMG_9399.JPG'
  - '/cdn-cgi/image/height=1080,quality=75,format=avif/https://static.eartharoid.me/my-photos/misc/IMG_9399.JPG'
tags:
  - 'photography'
---

I have over twenty thousand photos, scattered and disorganised -
over a thousand printed film photos from pre-2010 which I'm (not) looking forward to digitising,
hundreds, possibly thousands of digital family photos (hopefully still) on an old PC,
and over ten thousand (though probably at least half very similar or low quality) taken on my DSLR since 2018.

I've been thinking about it for years and the problem is only getting bigger, but I've decided to finally:

- Gather all photos into one place
- Make the collection more manageable by removing quasi-duplicate and low-quality photos
- Make sure they're backed up
- Make them accessible and easy to browse (rather than sitting unseen for many more years).

I might write another post about this journey in the future, but for now, I just want to show my surprisingly easy solution to one of these problems.

## PhotoPrism

Before officially starting my quest ~~(for the 5th time)~~, I wanted to find the best digital album software.
I eventually settled on [PhotoPrism](https://www.photoprism.app/), and one of its features is a Map.

## The problem

Unfortunately, very few of my photos (only the ones taken on a phone) have location data as the cameras don't have GPS receivers.
[Canon's bulky GPS accessory](https://store.canon.co.uk/canon-gp-e2-gps-receiver/6363B001/) costs over £300,
but it appears to be possible to connect to the camera with the companion app to use a phone's GPS, though that has its own problems.
Either way, none of these solutions can help with photos I've already taken.

## The solution

I decided I'd have to manually add very general locations to my old photos, but as I was thinking about the best way to add GPS to future photos,
I suddenly realised that I already have location data, Google has been tracking me for years! I just need to merge it with the photos.

![Google Maps Timeline](/img/firefox_ZudnqkN3PW.png)


After downloading my Location History from [Google Takeout](https://takeout.google.com/), I had nearly 200,000 data points in an almost 130MB JSON file.
Most of the 5.2 million lines in the file were about inferred activities so in the end there was only 9MB of useful data.

I'm not the first person to think of this and someone else has already made [a tool for it](https://chuckleplant.github.io/2018/07/23/google-photos-geotag.html).
There were a couple of problems with it though:

1. It's written in Python (ew)
2. Google changed the export format very slightly. It would be very easy to update the script, but point 1...

But the main reason I didn't use that script is that there's already a respected tool for merging geolocation data with photos, [ExifTool](https://exiftool.org/).
ExifTool is the perfect tool for the job, the only problem is the format of the data exported from Google.

I wrote a quick script to convert `Records.json` to a simple CSV file that ExifTool can read: <https://github.com/eartharoid/google-timeline-to-exiftool>.

```js
#!/usr/bin/env node

import {
	readFile,
	writeFile,
} from 'node:fs/promises';

const inputFile = process.argv[2] || './Records.json';
let csv = 'GPSAltitude,GPSDateTime,GPSLatitude,GPSLongitude,GPSSpeed (m/s),GPSTrack';
console.log('Reading', inputFile, '...');
const { locations } = JSON.parse(await readFile(inputFile, 'utf-8'));
console.log('Processing ...');

for (const location of locations) {
	const row = {
		'GPSAltitude': location.altitude ?? '',
		'GPSDateTime': location.timestamp.replace(/-/g, ':').replace('T', ' '),
		'GPSLatitude': location.latitudeE7 / 1e7,
		'GPSLongitude': location.longitudeE7 / 1e7,
		'GPSSpeed (m/s)': location.velocity ?? '',
		'GPSTrack': location.heading ?? '',
	};
	csv += '\n' + Object.values(row).join(',');
}

console.log('Writing history.csv ...');
await writeFile('./history.csv', csv);
```

Then I used the output CSV file with ExifTool:

```sh
exiftool.exe -geotag history.csv Photos
```

## The results

I tried it with a few dozen images from my recent holiday and was initially surprised by the accuracy, considering this is all passive data collection.
Part of that surprise was just because I realised it's so much better than I would have done manually.

I noticed that some photos were a few miles off though.
After reading the [ExifTool documentation](https://www.exiftool.org/geotag.html), I realised my camera's clock was almost 20 minutes fast.

![GeoSetter](/img/GeoSetter_agETHLtMBx.png)

After correcting for the time,

```sh
exiftool.exe -geotag history.csv -geosync=-18:47 Photos
```

A few photos are still a bit off, but this must be a result of the tracking inaccuracy (as it doesn't solely rely on GPS) because I definitely didn't stand in the sea here...
Overall, most photos got a little closer to their actual location (now mostly within 50m, some a few hundred),
and photos that were taken in the same place are now much more consistent, so offsetting the large time difference made a big improvement.

![GeoSetter](/img/GeoSetter_cDQjLYFQSM.png)



## Summary

I'm very happy with the results, and that it was so easy to do.
Unfortunately, my location history only goes back to 2019, but this has saved me a lot of time and effort, whilst giving better results than I could have done manually.

Whilst not perfect, Google's data is good enough that I'm considering using it for future photos too, as it seems easier than connecting my phone to my camera.

I didn't expect to use it for anything like this, but I'm glad I allowed Google to track me and it wasn't for nothing.
Looking at the raw data was slightly worrying though, they have a lot more data than you see on your [Timeline](https://timeline.google.com/).