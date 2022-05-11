---
title: "I made a URL shortener with Cloudflare Workers"
date: 2022-05-11T19:32:18+01:00
draft: false
hero: 'https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
images:
  - 'https://static.eartharoid.me/k/22/05/11210434.png'
tags:
  - 'serverless'
---

If you're attentive, you might have noticed I already have a URL shortener at `go.eartharoid.me`.
This was originally a [YOURLS](https://yourls.org/) instance until I made [a custom solution](https://github.com/eartharoid/go/tree/v1) with Vercel and Firebase/Firestore in January 2021.

![](https://i.imgur.com/jJf6syj.png)
*^ The landing page of the 2021 version*

I made the Vercel-Firebase URL shortener because I wanted something fast and serverless, but I still wanted the API, admin UI, and analytics that YOURLS had.
[It worked well](https://imgur.com/a/ZR0YXMg), except that Vercel's caching made the management, preview, and stats pages almost useless.
This was probably an easy fix, but I didn't know how to do it and I gave up quickly.

Less than 18 months later, my custom and serverless URL shortener had redirected over [5000 requests from 3000 visitors](https://static.eartharoid.me/k/22/05/09223553.png).
Unfortunately, all of the analytical data stored poorly in Firestore caused my once speedy service to become extremely sluggish.

I don't know why, but on Monday (09/05/2022) I was looking at domains again, and a few hours later I bought `lnk.earth`.
After saying goodbye to my money and earlier experiencing the slowness of the existing shortener, I decided, without much thought, to make a new shortener.

I chose Workers because I hadn't used it for anything yet and I wanted to try it.
Paired with KV, Workers are extremely fast and require little code to get things done.
As I was aiming to get it done in a day (because it was unplanned), I didn't make an admin UI or even an API.
I don't shorten URLs very often, and I don't need to do it quickly.
Cloudflare's dashboard and the CLI are both easy ways to manage the KV database.
I may add an API if my needs change in the future.

I already use [Umami](https://umami.is) on my websites, and I realised it is perfect for this project.
This made analytics very easy, I just needed to send the request data to Umami.

![](https://static.eartharoid.me/k/22/05/11211100.png)

[*^ The Umami page for lnk.earth*](https://umami.eartharoid.me/share/ZIFQz2rj)

## The result

My new Cloudflare Workers and KV shortener is incredibly fast, and with Umami for analytics, it should stay fast.

Requests were taking at least 2 seconds to be redirected, sometimes up to 7 seconds. Now it takes around 0.1 seconds (as low as 87ms).

![](https://static.eartharoid.me/k/22/05/11220442.png)

[*^__2021__ version of the preview page*](https://eartharoid-go.vercel.app/discord~)

vs

![](https://static.eartharoid.me/k/22/05/11210434.png)

[*^__2022__ version of the preview page*](https://lnk.earth/discord~)

To conclude, my URL shortener:

- is 25-70x faster
- has a new domain - `lnk.earth` - so URLs are *actually* short (although `go.eartharoid.me` also works)
- has better analytics with Umami
- has a cleaner preview page
- was (mostly) made in less than a day

> Photo by [Dynamic Wang](https://unsplash.com/@dynamicwang) on [Unsplash](https://unsplash.com/).