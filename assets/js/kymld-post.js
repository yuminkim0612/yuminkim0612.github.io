/* KYMLD — Observation Record */

document.addEventListener("DOMContentLoaded", function () {

    const content = document.getElementById("post-content");
    const toc = document.getElementById("post-toc-list");
    const sidebar = document.querySelector(".post-sidebar");

    if (!content) return;

    /* ==============================
       Automatic Table of Contents
    ============================== */

    const headings = Array.from(
        content.querySelectorAll("h1, h2, h3, h4")
    );

    const tocLinks = [];

    if (toc && headings.length > 0) {

        headings.forEach(function (heading, index) {

            if (!heading.id) {
                let id = "section-" + (index + 1);

                while (document.getElementById(id)) {
                    id += "-1";
                }

                heading.id = id;
            }

            const link = document.createElement("a");

            link.href = "#" + encodeURIComponent(heading.id);
            link.textContent = heading.textContent.trim();
            link.className = "toc-" + heading.tagName.toLowerCase();

            link.addEventListener("click", function (event) {

                event.preventDefault();

                heading.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(
                    null,
                    "",
                    "#" + encodeURIComponent(heading.id)
                );

            });

            toc.appendChild(link);
            tocLinks.push(link);

        });

    } else if (sidebar) {

        sidebar.style.display = "none";

        const layout = document.querySelector(".post-layout");

        if (layout) {
            layout.style.gridTemplateColumns = "minmax(0, 1fr)";
        }

    }

    /* ==============================
       Active Contents Highlight
    ============================== */

    function updateActiveHeading() {

        if (headings.length === 0) return;

        let activeIndex = 0;

        headings.forEach(function (heading, index) {

            if (heading.getBoundingClientRect().top <= 100) {
                activeIndex = index;
            }

        });

        tocLinks.forEach(function (link, index) {

            link.classList.toggle(
                "active",
                index === activeIndex
            );

        });

    }

    window.addEventListener("scroll", updateActiveHeading, {
        passive: true
    });

    updateActiveHeading();

    /* ==============================
       Terminal Code Blocks
    ============================== */

    const codeBlocks = content.querySelectorAll("pre");

    codeBlocks.forEach(function (pre) {

        if (pre.closest(".post-terminal")) return;

        const code = pre.querySelector("code");

        const originalBlock =
            pre.closest(".highlighter-rouge") ||
            pre.closest(".highlight") ||
            pre;

        let language = "TEXT";

        const languageElement =
            pre.closest('[class*="language-"]') ||
            code;

        if (languageElement) {

            const match = languageElement.className.match(
                /(?:^|\s)language-([\w+#-]+)/
            );

            if (match) {
                language = match[1].toUpperCase();
            }

        }

        /* Terminal Wrapper */

        const terminal = document.createElement("div");
        terminal.className = "post-terminal";

        const terminalHeader = document.createElement("div");
        terminalHeader.className = "post-terminal-header";

        const terminalLabel = document.createElement("span");
        terminalLabel.textContent = "TERMINAL / " + language;

        const copyButton = document.createElement("button");
        copyButton.className = "post-copy";
        copyButton.type = "button";
        copyButton.textContent = "COPY";
        copyButton.setAttribute("aria-label", "Copy code");

        terminalHeader.appendChild(terminalLabel);
        terminalHeader.appendChild(copyButton);

        originalBlock.parentNode.insertBefore(
            terminal,
            originalBlock
        );

        terminal.appendChild(terminalHeader);
        terminal.appendChild(originalBlock);

        /* Copy Button */

        let resetTimer;

        copyButton.addEventListener("click", async function () {

            const codeText = code
                ? code.textContent
                : pre.textContent;

            try {

                await navigator.clipboard.writeText(codeText);

                copyButton.textContent = "COPIED";

            } catch (error) {

                copyButton.textContent = "FAILED";

            }

            clearTimeout(resetTimer);

            resetTimer = setTimeout(function () {

                copyButton.textContent = "COPY";

            }, 1800);

        });

    });

});
