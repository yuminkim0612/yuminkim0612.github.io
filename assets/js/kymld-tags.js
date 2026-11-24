document.addEventListener("DOMContentLoaded", () => {

    const map = document.getElementById("constellation-map");
    const svg = document.getElementById("constellation-lines");

    if (!map || !svg) return;

    const stars = [...map.querySelectorAll(".constellation-star")];
    const ns = "http://www.w3.org/2000/svg";

    const offsets = [-18, 24, -12, 30, 15, -22, 26, -8];

    stars.forEach((star, index) => {
        star.style.top = offsets[index % offsets.length] + "px";
    });

    function drawConstellation() {

        svg.replaceChildren();

        const bounds = map.getBoundingClientRect();

        svg.setAttribute(
            "viewBox",
            `0 0 ${bounds.width} ${bounds.height}`
        );

        const points = stars.map(star => {

            const symbol = star.querySelector(".star-symbol");
            const rect = symbol.getBoundingClientRect();

            return {
                x: rect.left - bounds.left + rect.width / 2,
                y: rect.top - bounds.top + rect.height / 2
            };
        });

        function connect(a, b) {

            const line = document.createElementNS(ns, "line");

            line.setAttribute("x1", a.x);
            line.setAttribute("y1", a.y);
            line.setAttribute("x2", b.x);
            line.setAttribute("y2", b.y);
            line.setAttribute("stroke", "#53666b");
            line.setAttribute("stroke-width", "0.8");
            line.setAttribute("stroke-dasharray", "4 5");
            line.setAttribute("opacity", "0.65");

            svg.appendChild(line);
        }

        // 가까운 별들을 연결

        points.forEach((point, index) => {

            const nearest = points
                .map((other, i) => ({
                    index: i,
                    distance: Math.hypot(
                        point.x - other.x,
                        point.y - other.y
                    )
                }))
                .filter(item => item.index !== index)
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 2);

            nearest.forEach(item => {
                if (item.index > index) {
                    connect(point, points[item.index]);
                }
            });

        });

        // 별자리 외곽 궤도

        if (points.length > 2) {

            const orbit = document.createElementNS(ns, "ellipse");

            orbit.setAttribute("cx", bounds.width / 2);
            orbit.setAttribute("cy", bounds.height / 2);
            orbit.setAttribute("rx", bounds.width * 0.43);
            orbit.setAttribute("ry", bounds.height * 0.34);
            orbit.setAttribute("fill", "none");
            orbit.setAttribute("stroke", "#53666b");
            orbit.setAttribute("stroke-width", "0.7");
            orbit.setAttribute("opacity", "0.35");

            svg.prepend(orbit);
        }

    }

    drawConstellation();

    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(drawConstellation);
        observer.observe(map);
    } else {
        window.addEventListener("resize", drawConstellation);
    }

    if (document.fonts) {
        document.fonts.ready.then(drawConstellation);
    }

});
