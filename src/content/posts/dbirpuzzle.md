---
title: Verizon DBIR Puzzle 2016
category: puzzles
date: 2016-05-09 03:00:00 -05:00
tags:
- Puzzles
layout: post
---
I've been watching [my brother](http://darthnull.org) solve various crypto puzzles here and there on the internet for years. So, I figured I'd give one a shot—I mean, if he could do it, how difficult could it really be? **Spoiler:** _It was a giant pain in the ass_.

## Some Background

My brother is into [puzzles](http://darthnull.org/tag/puzzles), he goes to 'cons' all over the country to have a go at hacking badges and cracking codes—apparently he's pretty good at it. One puzzle in particular I see him talk about every year is the [Verizon DBIR Cover Challenge](https://securityblog.verizonenterprise.com/?p=6143). Basically, when Verizon releases its annual [Data Breach Investigation Report](http://www.verizonenterprise.com/verizon-insights-lab/dbir/2016/), they embed a clue or two on the front and/or back covers that are the start to a long and winding puzzle—eventually leading to denial, isolation, anger, bargaining, depression, and acceptance—not necessarily in that order.  

When I found out my brother wasn't going to be competing in the #DBIRPuzzle this year, I figured I'd give it a shot. **This was my first mistake**.

## The Puzzle

I won't go into the whole twisted tale here, the third place winner Matthew Keyser has a [good writeup](http://cyberpathogen.blogspot.com/2016/05/dbir-puzzle-2016-writeup.html) of most of the journey. Like him, I found the hidden text on the back cover, the morse code on the front, and ended up at the [Cyber CDC Global](http://cybercdc.global) page trying to solve as many of the mini puzzles as I could. I ended up solving six out of the nine:

![My Cyber CDC Team](/images/dbirteam.jpg)

After getting 4 recruits and assembling my team, the [Cyber Pathogen](http://cyber.pathogen.ai) spit out an '[infection log](/images/infection_log.8f94829b479a2585e080ab0d4a39df89)'. I took a quick look at it, realized I had no fucking clue what was going on there (_aside from the generic descriptions in the first row_) and quickly set it aside. When I hit 5 recruits and grabbed the [second version of the log](/images/infection_log.10d410815ce5c064c370a174dc75a44a), I ran a quick diff between the two files and landed on 11 records that I assumed must contain patient zero. A quick Google for the first hash in the first record revealed a [pastebin](http://pastebin.com/67Z8Rs6B) of all victims. I filled in what I could and quickly realized that 'otiliawilliamson' was the 'node' in all 11 records.

![Partially Unhashed Infection Log](/images/log.jpg)

I don't know how Cyber Pathogen's are supposed to work, but Otilia seemed pretty involved to me. I thought about submitting a guess naming her as patient zero but a simple diff and a quick Google search seemed way too easy for it to be correct—I reached out to my brother to see what he thought.

**Now, I should mention here that apparently my brother was somewhat involved in crafting the 2016 DBIR Puzzle**.

I knew that he had been working on some component of the larger puzzle—he mentioned something about audio tones over Easter—but that was all I knew. I'm still not sure of what all he was or wasn't responsible for, or what he did or did not know—but he agreed that Otilia seemed too easy to be correct. So I set the logs aside again and started working on the one puzzle I'd spend the rest of my time banging my head against: _Dr. Tipton_.

## The Strange Case of Dr. Tipton

The first Tipton clue I saw mentioned by the [@Cyber_CDC](https://twitter.com/cyber_cdc) Twitter account was: _'Dr. Pedro Tipton is a brilliant researcher but his contributions often remain in the background'_. I immediately grabbed the [full image](/images/tibbet-pathologist2.png) from his bio on the Cyber CDC website (_a photo of him standing in front of a cluttered whiteboard_) and had a look. After some Googling of the text scribbled on the whiteboard, I found the [original image](/images/original.jpg) and noted that the only addition was the good Doctor himself, and the string of text on the left hand side.

My immediate reaction upon focusing on the added text was:

> "It's DNA, duh. I saw [GATTACA](http://www.imdb.com/title/tt0119177/)—this shouldn't be a problem."

I wasn't sure how the x's figured into it—I thought maybe one section was a key and the other was encoded text, I decided to consider them both separately until I learned more.

I figured A goes with T and G goes with C, I must be able to convert it to binary. I considered one base pair as 0 and the other as 1, then tried to convert it to ASCII: **Nope**. I switched the assignment around and tried it again: **Nope**. I created a new string of nucleobases that would pair up with the existing string, converted that to binary, then tried to convert that to ASCII: **Nope**. I looked at the original string, squinted hard, and tried morse code: **Nope**. I gave up.

I stumbled upon some [ random](http://dna2z.com/DNA-o-gram/decode.php) DNA encode/decode [schemes](https://www.sgidna.com/cipher.html) and tried to run the string though them: **Nope**. I tried reversing the binary string: **Nope**. I tried a bunch of other stuff I'm too ashamed to admit to: **Nope**. Eventually, I came to the conclusion that the string I was starting with was no good. I gave up.

I saw a [Tweet](https://twitter.com/mattjay/status/725894482651013120?lang=en) from [@mattjay](https://twitter.com/mattjay), who would go on to be the 1st place winner, which mentioned all the printing and cutting he was doing. Then I saw the second Tipton clue from the @Cyber_CDC account, it mentioned that "_sometimes a puzzle starts with a puzzle_". I gave in and started back at the beginning, printing and cutting out each row of the text and looking for patterns.

![Putting the pieces together](/images/crafting.jpg)

Eventually, I saw it. Each row overlapped with another, forming one single string. I fit them all together, copied out the new string of nucleobases and ran it through all the previous attempts mentioned above: **Nope**. I gave up.

I was pretty confident I had the right nucleobase string at this point, but was still stuck—then another idea occurred to me. I split the string into two equal rows and applied a kind of anti [XOR type operation](https://en.wikipedia.org/wiki/Exclusive_or) to each column—base pairings resulting in a 1 and misses resulting in a 0: **Nope**. I reversed the assignment: **Nope**. I gave up.

The third and final [Tipton clue](https://twitter.com/cyber_cdc/status/727606369520484352) from the @Cyber_CDC account, unlocked it all for me: _"Tipton thinks that pyrimidines are #1"_. After a quick Google I learned that two of the four nucleobases found in DNA were pyrimidine derivatives, Cytosine and Thymine (_obviously_). I converted the string to binary one last time, assigning a 1 for each C or T and a 0 for each A or G. Then I converted the binary to ASCII, and I finally had my answer: 'primenumber'.

## Zeroing In

After assembling my team of 6 and getting the third and final log, I quickly looked again for the 'otiliawilliamson' hash but found she was all over the place, and of no help. I then looked for the 'enc_data' string shared by all of the original 11 records I was focused on—this looked like a base64 string to me but I was never able to figure out what it was. Finding those 11 records again in the new log, I was able to see that they all shared the same 'infected_by' hash: '206e52ca829a42776c8b7b9c81cfd061'. A quick Google found the [Hash Killer Site](http://hash-killer.com/dict/2/0/6/e) containing both the hash and the original text: 'kevinthompson' i.e. patient zero.

I submitted my guess, but missed 1st place by 40 minutes or so. Second place isn't so bad.

## Final Analysis

This was a lot of fun, and I'd do it again—maybe, probably not. It's easy to see how I could have done better. I held on to assumptions, way past the point I should have abandoned them and looked for a new thread to pull on. Time and time again, I ran down the first path I found rather than staying where my assumptions were solid and gathering more information. Still, it was lots of fun—sometimes frustrating—but mostly fun.
