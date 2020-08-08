import React, { useRef, useState, useEffect } from 'react';
import { TimelineMax, Power4, Power3, Power2, gsap } from 'gsap/gsap-core';
import './Modal.css'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { AIName } from '../../helpers/utils';

const GsapModal = props => {

    const modalRef = useRef(null)
    const openButtonRef = useRef(null)
    const modalContentlRef = useRef(null)
    const modalDialogRef = useRef(null)
    const modalPolygonRef = useRef(null)
    const modalSVGRef = useRef(null)


    let animation = {check: true};
    // vanilla JS
    var body = document.body;
    var modal = modalRef; // createModal(document.querySelector("#modal-1"));
    var openButton = openButtonRef; // document.querySelector("#open-button");

    const { showModal, setShowModal, score, mobileClass } = props;
// animation={check: ''}

    const getWinnerName = () => {
        const scoreMap = score.map(el => el.score)
        const winnerIndex = scoreMap.indexOf(Math.max(...scoreMap));
        return winnerIndex >= 0 ? score[winnerIndex] : {};
    }

    useEffect(() => {

        if (showModal) {

            var container = modalRef.current;
            var content = modalContentlRef.current; // container.querySelector(".modal-content");
            var dialog = modalDialogRef.current; // container.querySelector(".modal-dialog");
            var polygon = modalPolygonRef.current; // container.querySelector(".modal-polygon");
            var svg = modalSVGRef.current; // container.querySelector(".modal-svg");

            polygon.points.clear()

            var point1 = createPoint(45, 45);
            var point2 = createPoint(155, 45);
            var point3 = createPoint(55, 55);
            var point4 = createPoint(45, 55);

            function createPoint(x, y) {
                var point = polygon.points.appendItem(svg.createSVGPoint());
                point.x = x || 0;
                point.y = y || 0;
                return point;
            }


            var newAnimation = new TimelineMax({
                // onReverseComplete: onReverseComplete,
                // onStart: onStart,
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
                }); // .reverse()
            animation = newAnimation;
            animation.play()
        }
    }, [showModal]);

    const close = () => {
        animation.reverse().time(1.5)
        setShowModal(false)
    }

    const ModalBody = score ? (<div ref={modalContentlRef} className={getWinnerName().name == AIName ? "modal-content lose" : 'modal-content win'}>
        {props.children}
    </div>) : <div>{props.children}</div>

    console.log('Animation is ', animation)

    return <div>
        {/* <section className="controls">
            <button ref={openButtonRef} onClick={() => animation.play()} id="open-button">{'Open'}</button>
            <button onClick={() => close()} id="open-button">{'Close'}</button>
        </section> */}

        <section onClick={() => close()} id="modal-1" ref={modalRef} className="modal-container">

            <div ref={modalDialogRef} className={mobileClass ? 'modal-dialog-mobile' : "modal-dialog"}>
                <svg ref={modalSVGRef} className="modal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon ref={modalPolygonRef} className="modal-polygon" />
                </svg>

                {ModalBody}
            </div>
        </section>
    </div>
};

gsap.registerPlugin(CSSPlugin)

export default GsapModal;