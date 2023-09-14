---
title: Viewing AWS logs on the Command Line
date: 2018-03-28 22:00:00 Z
category: tooling
tags:
- Serverless
- Web Development
layout: post
---

If you've ever tried to quickly check AWS logs from the command line then you know my pain. Don't get me wrong, the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/index.html#cli-aws) is great and all but—if I just want to quickly double check that a Lambda function has returned what I think it has—it's kind of a giant pain in the ass. You've got to first `describe-log-streams` for a given log group, grep to find the most recent stream and capture the `logStreamName`, then `get-log-events` for the stream (requires `logStreamName`), and then finally grep for what it is you were hoping to find.

I'd say that this was basically like "living in Mogadishu"—but then I'd have to punch myself in my first world face—so I'll just say that it's less than ideal. So, recently I've been using [awslogs](https://github.com/jorgebastida/awslogs), a nice little Pyhton utility for doing the same type of thing—only more better.

Why better? Because you can do the same thing as above, in a single command. 

`awslogs get /aws/lambda/myGroup 2018/03/28 -s2h | grep objectIDs -C 1`

Basically: get events for the given log group, where streams match the given expression, in the given timeframe—then grep for what I'm hoping to find. **I'm sure there must be a better way of doing this kind of thing that I'm totally unaware of but, "works for me"™**.

