---
layout: none
title: Tags
order: 2
permalink: /tags/
---
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tags | KYMLD</title>
    <link rel="stylesheet" href="{{ '/assets/css/kymld-tags.css' | relative_url }}">
</head>

<body id="top" class="constellation-page">

<header class="constellation-header">
    <a href="{{ '/' | relative_url }}">
        <img src="{{ '/assets/img/kymld-brand.png' | relative_url }}" alt="KYMLD">
    </a>

    <nav>
        <a href="{{ '/' | relative_url }}">HOME</a>
        <a href="{{ '/categories/' | relative_url }}">CATEGORIES</a>
        <a href="{{ '/archives/' | relative_url }}">ARCHIVE</a>
        <a class="active" href="{{ '/tags/' | relative_url }}">TAGS</a>
        <a href="{{ '/about/' | relative_url }}">ABOUT</a>
    </nav>
</header>

<main class="constellation-main">

    <section class="constellation-heading">
        <p>KYMLD / CONSTELLATION INDEX</p>
        <h1>Tags</h1>
        <p>EXPLORE THE CONSTELLATION OF KNOWLEDGE.</p>
    </section>

    {% assign tags = site.tags | sort %}

    <div class="constellation-map" id="constellation-map">

        <svg class="constellation-lines"
             id="constellation-lines"
             aria-hidden="true">
        </svg>

        {% for tag in tags %}

        <a class="constellation-star"
           href="#tag-{{ forloop.index }}">

            <svg class="star-symbol"
                 viewBox="0 0 40 40"
                 aria-hidden="true">
                <path d="M20 0
                         Q22 18 40 20
                         Q22 22 20 40
                         Q18 22 0 20
                         Q18 18 20 0Z"
                      fill="currentColor"/>
            </svg>

            <span class="star-name">
                {{ tag[0] | escape }}
            </span>

            <span class="star-count">
                {{ tag[1].size }} RECORDS
            </span>

        </a>

        {% endfor %}

    </div>

    <div class="constellation-status">
        <span>TOTAL STARS: {{ tags.size }}</span>
        <span>— CONSTELLATION INDEX —</span>
    </div>

    {% for tag in tags %}

    <section class="constellation-results"
             id="tag-{{ forloop.index }}">

        <p class="result-caption">SELECTED CONSTELLATION</p>

        <h2>{{ tag[0] | escape }}</h2>

        {% for post in tag[1] %}

        <a class="constellation-post"
           href="{{ post.url | relative_url }}">

            <span>{{ post.title | escape }}</span>

            <time>
                {{ post.date | date: "%Y.%m.%d" }}
            </time>

        </a>

        {% endfor %}

        <a class="constellation-back" href="#top">
            BACK TO CONSTELLATION ↑
        </a>

    </section>

    {% endfor %}

</main>

<footer class="constellation-footer">
    <span>© {{ site.time | date: "%Y" }} KYMLD</span>
    <a href="https://github.com/yuminkim0612">GITHUB ↗</a>
</footer>

<script src="{{ '/assets/js/kymld-tags.js' | relative_url }}"></script>

</body>
</html>
