---
layout: null
title: Categories
icon: fas fa-stream
order: 1
permalink: /categories/
---
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Categories | KYMLD</title>
    <link rel="stylesheet" href="{{ '/assets/css/kymld.css' | relative_url }}">
    <link rel="stylesheet" href="{{ '/assets/css/kymld-categories.css' | relative_url }}">
</head>

<body class="memory-page">

<header class="memory-header">
    <a href="{{ '/' | relative_url }}">
        <img src="{{ '/assets/img/kymld-brand.png' | relative_url }}" alt="KYMLD">
    </a>

    <nav>
        <a href="{{ '/' | relative_url }}">HOME</a>
        <a class="active" href="{{ '/categories/' | relative_url }}">CATEGORIES</a>
        <a href="{{ '/archives/' | relative_url }}">ARCHIVE</a>
        <a href="{{ '/tags/' | relative_url }}">TAGS</a>
        <a href="{{ '/about/' | relative_url }}">ABOUT</a>
    </nav>
</header>

<main class="memory-main">

    <section class="memory-heading">
        <p>KYMLD / MEMORY INDEX</p>
        <h1>Categories</h1>
        <p>SELECT A MEMORY CARTRIDGE.</p>
    </section>

    {% assign names = "Development|CTF / Wargame|Bug Bounty|Technical Writing|Research / Conference|Contest / Certification" | split: "|" %}
    {% assign labels = "개발|CTF/Wargame|Bug Bounty|블로그/기술문서|논문/컨퍼런스|공모전/자격증" | split: "|" %}

    <div class="memory-grid">

        {% for name in names %}
        {% assign category = labels[forloop.index0] %}

        <a class="memory-card" href="#memory-{{ forloop.index }}">

            <img src="{{ '/assets/img/kymld-memory.png' | relative_url }}" alt="">

            <div class="memory-number">
                0{{ forloop.index }}
            </div>

            <div class="memory-name">
                {{ name }}
            </div>

            <div class="memory-label">
                {{ category }}
            </div>

            <div class="memory-serial">
                KYM-00{{ forloop.index }}
            </div>

        </a>

        {% endfor %}

    </div>

    <p class="memory-status">
        — 06 MEMORY CARTRIDGES AVAILABLE —
    </p>

    {% for category in labels %}
    <section class="memory-results" id="memory-{{ forloop.index }}">
        <h2>{{ category }}</h2>

        {% assign posts = site.categories[category] %}

        {% for post in posts %}
        <a class="memory-post" href="{{ post.url | relative_url }}">
            <span>{{ post.title }}</span>
            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
        </a>
        {% else %}
        <p>아직 등록된 게시글이 없습니다.</p>
        {% endfor %}

        <a class="memory-back" href="#top">BACK TO INDEX ↑</a>
    </section>
    {% endfor %}

</main>

<footer class="memory-footer">
    <span>© 2026 KYMLD</span>
    <a href="https://github.com/yuminkim0612">GITHUB ↗</a>
</footer>

</body>
</html>
