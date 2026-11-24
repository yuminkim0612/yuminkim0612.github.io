---
layout: none
title: Archive
order: 3
permalink: /archives/
---
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Archive | KYMLD</title>
    <link rel="stylesheet" href="{{ '/assets/css/kymld-archive.css' | relative_url }}">
</head>

<body class="archive-page">

<header class="archive-header">
    <a href="{{ '/' | relative_url }}">
        <img src="{{ '/assets/img/kymld-brand.png' | relative_url }}" alt="KYMLD">
    </a>

    <nav>
        <a href="{{ '/' | relative_url }}">HOME</a>
        <a href="{{ '/categories/' | relative_url }}">CATEGORIES</a>
        <a class="active" href="{{ '/archives/' | relative_url }}">ARCHIVE</a>
        <a href="{{ '/tags/' | relative_url }}">TAGS</a>
    </nav>
</header>

<main class="archive-main">

    <section class="archive-heading">

        <div class="archive-heading-text">
            <p class="archive-eyebrow">KYMLD / OBSERVATION RECORDS</p>
            <h1>Archive</h1>
            <p class="archive-description">
                ALL RECORDED DATA IN CHRONOLOGICAL ORDER.
            </p>
        </div>

        <svg class="archive-orbit" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor">
                <circle cx="110" cy="90" r="65" stroke-width="0.8"/>
                <circle cx="110" cy="90" r="45" stroke-width="0.7" stroke-dasharray="3 5"/>
                <circle cx="110" cy="90" r="28" stroke-width="0.7"/>

                <ellipse cx="110" cy="90" rx="98" ry="27"
                    transform="rotate(-30 110 90)"
                    stroke-width="1.2"/>

                <path d="M110 8 V172 M25 90 H195"
                    stroke-width="0.6"
                    stroke-dasharray="4 5"/>

                <path d="M104 90 H116 M110 84 V96"
                    stroke-width="1.2"/>

                <circle cx="161" cy="50" r="4"
                    fill="currentColor" stroke="none"/>
            </g>
        </svg>

    </section>

    {% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
    {% assign record_number = site.posts.size %}

    {% for year in years %}

    <section class="archive-year">

        <h2>{{ year.name }}</h2>

        <div class="archive-table">

            <div class="archive-table-heading">
                <span>RECORD ID</span>
                <span>DATE</span>
                <span>OBSERVATION TITLE</span>
                <span>CLASSIFICATION</span>
                <span></span>
            </div>

            {% for post in year.items %}

            {% assign record_id = record_number | prepend: '000' | slice: -3, 3 %}

            <a class="archive-record" href="{{ post.url | relative_url }}">

                <span class="record-id">
                    OBS-{{ record_id }}
                </span>

                <time class="record-date">
                    {{ post.date | date: "%m.%d" }}
                </time>

                <span class="record-title">
                    {{ post.title | replace: "CTF/Wargame", "CTF/워게임" | replace: "Bug Bounty", "버그바운티" | escape }}
                </span>

                <span class="record-category">
                    {{ post.categories | join: " / " | replace: "CTF/Wargame", "CTF/워게임" | replace: "Bug Bounty", "버그바운티" | escape }}
                </span>

                <span class="record-arrow">↗</span>

            </a>

            {% assign record_number = record_number | minus: 1 %}

            {% endfor %}

        </div>

    </section>

    {% endfor %}

    <div class="archive-status">
        <span>TOTAL RECORDS: {{ site.posts.size }}</span>
        <span>— END OF TRANSMISSION —</span>
    </div>

</main>

<footer class="archive-footer">
    <span>© {{ site.time | date: "%Y" }} KYMLD</span>
    <a href="https://github.com/yuminkim0612">GITHUB ↗</a>
</footer>

</body>
</html>
