import React, { useRef, useState, useEffect } from 'react';
import { TimelineMax, Power4, Power3, Power2 } from 'gsap/gsap-core';


class GsapModal extends React.Component {

    constructor(props) {
        super(props);

        this.modalRef = null;
        this.openButtonRef = null;
        this.modalContentlRef = null;
        this.modalDialogRef = null;
        this.modalPolygonRef = null;
        this.modalSVGRef = null;

        this.state = {
            isOpen: false,
            animation: {}
        }
    }


    componentDidMount() {



        var content = this.modalContentlRef; // container.querySelector(".modal-content");
        var dialog = this.modalDialogRef; // container.querySelector(".modal-dialog");
        var polygon = this.modalPolygonRef; // container.querySelector(".modal-polygon");
        var svg = this.modalSVGRef; // container.querySelector(".modal-svg");

        var point1 = createPoint(45, 45);
        var point2 = createPoint(155, 45);
        var point3 = createPoint(55, 55);
        var point4 = createPoint(45, 55);
// debugger
        function createPoint(x, y) {
            var point = polygon.points.appendItem(svg.createSVGPoint());
            point.x = x || 0;
            point.y = y || 0;
            return point;
        }


        function onStart() {
            // body.appendChild(container);
            // container.addEventListener("click", onClick);
        }

        function onReverseComplete() {
            // container.removeEventListener("click", onClick);
            // body.removeChild(container);
        }


        var animation = new TimelineMax({
            onReverseComplete: onReverseComplete,
            onStart: onStart,
            paused: true
        })
            .to(point1, 0.3, {
                x: 15,
                y: 30,
                duration: 2,
                ease: Power4.easeIn
            }, 0)
            .to(point4, 0.3, {
                x: 5,
                y: 80,
                ease: Power3.easeIn
            }, "-=0.1")
            .to(point1, 0.3, {
                x: 0,
                y: 0,
                ease: Power3.easeIn
            })
            .to(point2, 0.3, {
                x: 100,
                y: 0,
                ease: Power2.easeIn
            }, "-=0.2")
            .to(point3, 0.3, {
                x: 100,
                y: 100,
                ease: Power2.easeIn
            })
            .to(point4, 0.3, {
                x: 0,
                y: 100,
                ease: Power2.easeIn
            }, "-=0.1")
            .to(container, 1, {
                autoAlpha: 1
            }, 0)
            .to(content, 1, {
                autoAlpha: 1
            })
    //     // setAnimation(animation);
    this.setState({animation})
    }


    open() {
        // modal.isOpen = true;
        this.setState({ isOpen: true })
        this.state.animation.play().timeScale(2);
    }


    close() {
        // modal.isOpen = false;
        this.setState({ isOpen: false })
        // setIsOpen(false);
        this.state.animation.reverse().timeScale(2.5);
    }

    render() {

        return <div><section className="controls">
            <button ref={el => {
                // console.log('Refffff is ', el);
                if (el) this.openButtonRef = el
            }} onClick={() => this.open(true)} id="open-button">Open</button>
        </section>


            <section id="modal-1" ref={el => this.modalRef = el} className="modal-container">

                <div ref={el => {
                    if (el) this.modalDialogRef = el
                }} className="modal-dialog">
                    <svg ref={el => {
                        if (el) this.modalSVGRef = el
                    }} className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon ref={el => {
                            debugger
                            if (el) {
                                console.log('Polygon ref ', el)
                                this.modalPolygonRef = el
                            }
                        }} className="modal-polygon" />
                    </svg>

                    <div ref={el => {
                        if (el) this.modalContentlRef = el
                    }} className="modal-content">
                        <h2>I'm a modal</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis excepturi ut inventore consectetur quos rerum quibusdam accusamus, labore itaque assumenda consequatur cum saepe velit quidem ipsa facilis. Repellendus, reiciendis quam?</p>
                    </div>

                </div>
            </section>
        </div>
    }
};

export default GsapModal;