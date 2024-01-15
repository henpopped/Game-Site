document.addEventListener('DOMContentLoaded', function () {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 330,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ["#6dd5ed", "#ff758c", "#f0f2f0"]
            },
            shape: {
                type: ["circle", "edge"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
            },
            opacity: {
                value: 1.25,
                random: false,
                anim: {
                    enable: true,
                    speed: 2,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: false,
                    speed: 60,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 75,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 3000,
                    rotateY: 3000
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "bubble"
                },
                onclick: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 50,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 90,
                    duration: 5
                }
            }
        },
        retina_detect: true
    });
});