---
title: "My new website"
date: 2021-01-19T11:59:41Z
draft: false
# hero: ''
# images:
#   - ''
tags:
  - 'websites'
---

## Why I made a new website

I started messing with basic HTML and CSS in 2016 and I have had a home page since at least 2019, probably 2018, but it was just an [HTML5 UP](https://html5up.net/) template. Whilst it looked ok-ish, it was slow and had very little information, only some unoptimized photos (uncompressed and 4K) and links to other pages.

Although I am writing this in August 2021, I started making this website in early January. I'd like to say that I thought I should have a somewhat professional-looking website to showcase my software and photography for potential customers, but honestly, I was just looking at static site generators (I can't remember why) and was interested by [Hugo](https://gohugo.io). A few hours later I was learning how to make my own Hugo theme (using what I now know is a disgusting template engine).


## Website requirements

Despite suddenly diving in to the website creation, I had been thinking about what I want my website to look like and the features I wanted it to have for at least a year. I knew that I wanted a full-page background image to be the first thing you see on the home page, and I also wanted a hero (the section at the top with navbar and title in front of an image) on every page.

I had thought about some features:

- Individual pages for all of my major projects
- A blog, although I'm not sure what for
- A photo gallery

## How it works

I chose to create my website with Hugo and Bulma, and host it on Vercel.

### Why I chose Hugo

I don't really know. I had been thinking about trying Go for a while, I was looking at Hugo's website and just decided to use it. 

### Why I chose Bulma

I have used Bulma for small things in the past so I know that it is easy to get a somewhat decent-looking website with not much effort. I learned that Bulma and themes I used (Flatly and Darkly) are not perfect though.

### Why I chose Vercel

I wanted fast and free hosting. I was considering using Vercel for another project and I decided it would be a good idea to test it with something easy to migrate away first.

## The development process

### January

I begun creating my website in early-mid January (2021). Between the 9th and 25th January I made most of the theme and the website was ready for content. However on the 26th I started making [eartharoid go](https://github.com/eartharoid/go), leaving the website in an incomplete state with no content.

### August

Skip forward half a year, I had just got back from my holiday when I decided to setup my Ko-fi memberships. I then created [a blog post on Ko-fi](https://ko-fi.com/post/Memberships-L3L85MG7T) announcing this. Minutes later I realised that the website I made months ago has a blog waiting to be used.

I started (on 8th August) by writing my home and about pages. A couple of days later I was adding more to theme, including improved meta tags (social embeds), taxonomy pages, adding a contact form and lots of little changes. I then decided to replace [Imagekit](https://imagekit.io/)-  the image CDN I had set up in January - with my own CDN (`static.eartharoid.me`, using Cloudfront and S3) and [image proxy](https://imgproxy.net/) (`img.eartharoid.me`, behind Cloudflare's CDN).

## What I'd do differently next time

I found creating my own Hugo theme very frustrating at times. Hugo's features make it look like the easy option for getting a static website running, especially one with a blog, but the template engine is awful and I found it limiting. [Hexo](https://hexo.io/) is a potential alternative which I may consider using in the future, but I think I am more likely to use [Next.JS](https://nextjs.org/).

I don't regret using Bulma. Although I probably won't use in my next personal website, it made this website much easier and faster to create.
