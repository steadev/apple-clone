import {data} from './data.js';
(() => {
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; // 현재 황성화 된 scene
    let enterNewScene = false; // 새로운 scene이 시작되는 순간 true

    let acc = 0.1;
    let delayedYOffset = 0;
    let rafId;
    let rafState;
    const sceneInfo = setSceneInfo(data);
    const sceneInfo2 = [
        {
            // 0
            heightNum: 5,
            scrollHeight: 0,
            type: "sticky",
            objs: {
                container: document.querySelector("#scroll-section-0"),
                message_0: document.querySelector("#scroll-section-0 .main-message.msg-0"),
                message_1: document.querySelector("#scroll-section-0 .main-message.msg-1"),
                message_2: document.querySelector("#scroll-section-0 .main-message.msg-2"),
                message_3: document.querySelector("#scroll-section-0 .main-message.msg-3"),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages:[]
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1}],

                message_0_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                message_0_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                message_0_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                message_0_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                
                message_1_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                message_1_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                message_1_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                message_1_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                
                message_2_opacity_in: [0, 1, { start:0.5, end:0.6}],
                message_2_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                message_2_opacity_out: [1, 0, { start:0.65, end:0.7}],
                message_2_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                
                message_3_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                message_3_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                message_3_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                message_3_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 1
            // heightNum: 5, // type normal에서는 필요 없음
            scrollHeight: 0,
            type: "normal",
            objs: {
                container: document.querySelector("#scroll-section-1"),
            },
        },
        {
            // 2
            heightNum: 5,
            scrollHeight: 0,
            type: "sticky",
            objs: {
                container: document.querySelector('#scroll-section-2'),
                message_0: document.querySelector('#scroll-section-2 .msg-0'),
                message_1: document.querySelector('#scroll-section-2 .msg-1'),
                message_2: document.querySelector('#scroll-section-2 .msg-2'),
                pin_1: document.querySelector('#scroll-section-2 .msg-1 .pin'),
                pin_2: document.querySelector('#scroll-section-2 .msg-2 .pin'),
                canvas: document.querySelector('#video-canvas-2'),
                context: document.querySelector('#video-canvas-2').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],

                message_0_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                message_0_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                message_0_translateY_in: [20, 0, { start: 0.25, end: 0.3 }],
                message_0_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],

                message_1_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                message_1_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                message_1_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                message_1_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],

                message_2_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                message_2_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                message_2_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                message_2_translateY_out: [0, -20, { start: 0.95, end: 1 }],

                pin_1_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pin_2_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            // 3
            heightNum: 5,
            scrollHeight: 0,
            type: "sticky",
            objs: {
                container: document.querySelector("#scroll-section-3"),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas-3'),
                context: document.querySelector('.image-blend-canvas-3').getContext('2d'),
                imagesPath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg',
                ],
                images:[]
            },
            values: {
                rect1X: [0, 0, { start: 0, end: 0 }],
                rect2X: [0, 0, { start: 0, end: 0 }],
                rectStartY: 0,
                blendHeight: [0, 0, { start: 0, end: 0 }],
                canvas_scale: [0, 0, { start: 0, end: 0 }],
                canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
                canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
            }
        },
    ];
    function createDOM(data){
        let container = document.querySelector('container');
        data.forEach((scene, sceneIdx)=>{
            container.innerHTML += `<section class="scroll-section" id="scroll-section-${sceneIdx}"></section>`;
            let curSection = document.querySelector(`#scroll-section-${sceneIdx}`);
            // type 마다 구성 순서가 다름
            if(scene.type === 'sticky_video'){ 
                // add title
                if(scene.title){
                    let title = document.createElement('h1');
                    title.innerText = `${scene.title.text}`;
                    title.style.fontSize = `${scene.title.size}rem`;
                    curSection.appendChild(title);
                }
                // add canvas
                if(scene.canvas){
                    curSection.innerHTML += `
                    <div class="sticky-elem sticky-elem-canvas">
                        <canvas id="video-canvas-${sceneIdx}" width="1920" height="1080"></canvas>
                    </div>`;
                }   
                // add messages
                if(scene.messages && scene.messages.length > 0){
                    scene.messages.forEach((message, idx) => {
                        curSection.innerHTML += `
                        <div class="sticky-elem ${message.type}-message msg-${idx}">
                            <p>${message.text}</p>`;
                        if(message.pin) curSection.innerHTML += `
                            <div class="pin"></div>`;
                        curSection.innerHTML += `
                        </div>`;
                    });
                }
            }else if(scene.type === 'sticky_image'){
                // add messages
                if(scene.messages && scene.messages.length > 0){
                    const messageDOM = document.createElement('div');
                    messageDOM.className = `${scene.messages[0].type}-message`;
                    messageDOM.innerHTML = scene.messages[0].text;
                    curSection.appendChild(messageDOM);
                }
                // add canvas
                if(scene.canvas){
                    curSection.innerHTML += `
                    <canvas class="image-blend-canvas image-blend-canvas-${sceneIdx}" width="1920" height="1080"></canvas>
                    `;
                }
                // add canvas caption
                if(scene.canvasCaption){
                    curSection.innerHTML`
                    <p class="canvas-caption">${scene.canvasCaption.text}</p>`;
                }
            }else if(scene.type === 'normal'){
                const normalDOM = document.createElement('p');
                normalDOM.className = 'description';
                // add title
                if(scene.title){
                    normalDOM.innerHTML = `<strong>${scene.title.text}</strong>`;
                }
                // add message
                if(scene.messages && scene.messages.length > 0){
                    normalDOM.innerHTML += scene.messages[0].text;
                }
                curSection.appendChild(normalDOM);
            }
        });
    }
    function setSceneInfo(data){
        let info = [];
        
        data.forEach((scene, sceneIdx)=>{
            let messages = {};
            let messagesOpacity = {};
            let pins = {};
            let pinOpacity = {};
            let canvas = {};
            let stickyImageValues = {};
            if(scene.type === 'sticky_video'){
                canvas = {
                    canvas: scene.canvas ? document.querySelector(`#video-canvas-${sceneIdx}`) : null,
                    context: scene.canvas ? document.querySelector(`#video-canvas-${sceneIdx}`).getContext('2d') : null,
                    videoImages:[]
                }
            }else if(scene.type === 'sticky_image'){
                canvas = {
                    canvas: document.querySelector(`.image-blend-canvas-${sceneIdx}`),
                    context: document.querySelector(`.image-blend-canvas-${sceneIdx}`).getContext('2d'),
                    canvasCaption: document.querySelector(`.canvas-caption-${sceneIdx}`),
                    imagesPath: scene.canvas.imageUrl,
                    images:[]
                }
                stickyImageValues = {
                    rect1X: [0, 0, { start: 0, end: 0 }],
                    rect2X: [0, 0, { start: 0, end: 0 }],
                    rectStartY: 0,
                    blendHeight: [0, 0, { start: 0, end: 0 }],
                    canvas_scale: [0, 0, { start: 0, end: 0 }],
                    canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
                    canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
                }
            }
            if(scene.messages){
                scene.messages.forEach((msg, msgIdx)=>{
                    messages[`message_${msgIdx}`] = document.querySelector(`#scroll-section-${sceneIdx} .${msg.type}-message.msg-${msgIdx}`);
                    if(msg.in_start){
                        messagesOpacity[`message_${msgIdx}_opacity_in`] = [0, 1, { start: msg.in_start, end:msg.in_end }];
                        messagesOpacity[`message_${msgIdx}_translateY_in`] = [20, 0, { start: msg.in_start, end:msg.in_end }];
                    }
                    if(msg.out_start){
                        messagesOpacity[`message_${msgIdx}_opacity_out`] = [1, 0, { start: msg.out_start, end:msg.out_end }];
                        messagesOpacity[`message_${msgIdx}_translateY_out`] = [0, -20, { start: msg.out_start, end:msg.out_end }];
                    }
                    if(msg.pin){
                        pins[`pin_${msgIdx}`] = document.querySelector(`#scroll-section-${sceneIdx} .msg-${msgIdx} .pin`);
                        pinOpacity[`pin_${msgIdx}_scaleY`] = [0.5, 1, { start: 0.6, end: 0.65 }]
                    }
                });
            }

            info.push({
                heightNum: scene.height,
                scrollHeight: 0,
                type: scene.type,
                objs: {
                    container: document.querySelector(`#scroll-section-${sceneIdx}`),
                    ...messages,
                    ...canvas,
                    ...pins
                },
                values: {
                    videoImageCount: scene.canvas && scene.canvas.imageCount ? scene.canvas.imageCount : null,
                    imageSequence: scene.canvas && scene.canvas.imageCount ? [0, scene.canvas.imageCount-1] : null,

                    canvas_opacity_in: scene.canvas && scene.canvas.in_start >= 0 ? [0, 1, { start: scene.canvas.in_start, end: scene.canvas.in_end }] : null,
                    canvas_opacity_out: scene.canvas && scene.canvas.out_start >= 0 ? [1, 0, { start: scene.canvas.out_start, end: scene.canvas.out_end }] : null,

                    ...messagesOpacity,
                    ...pinOpacity,

                    ...stickyImageValues
                }
            });
        });
        return info;
    }

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            // imgElem.src = `./video/001/IMG_${i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            // imgElem2.src = `./video/002/IMG_${i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++){
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
    }

    function checkMenu() {
        if (yOffset > 44) {
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');
        }
    }

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type.includes('sticky')) {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; 
            } else if(sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;    
        }

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= pageYOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd)
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            else if (currentYOffset < partScrollStart)
                rv = values[0];
            else if(currentYOffset > partScrollEnd)
                rv = values[1];
        } else {
            rv = scrollRatio * (values[1]-values[0]) + values[0];    
        }
        
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        console.log(objs)
        console.log(values);
        switch (currentScene) {
            case 0:
                // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);

                if (scrollRatio <= 0.22) {
                    // in
                    objs.message_0.style.opacity = calcValues(values.message_0_opacity_in, currentYOffset);;
                    objs.message_0.style.transform = `translateY(${calcValues(values.message_0_translateY_in, currentYOffset)}%)`;
                } else {
                    // out
                    objs.message_0.style.opacity = calcValues(values.message_0_opacity_out, currentYOffset);;
                    objs.message_0.style.transform = `translateY(${calcValues(values.message_0_translateY_out, currentYOffset)}%)`;
                }
                if (scrollRatio <= 0.42) {
                    // in
                    objs.message_1.style.opacity = calcValues(values.message_1_opacity_in, currentYOffset);
                    // objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.message_1.style.transform = `translateY(0, ${calcValues(values.message_1_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.message_1.style.opacity = calcValues(values.message_1_opacity_out, currentYOffset);
                    objs.message_1.style.transform = `translate3d(0, ${calcValues(values.message_1_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.message_2.style.opacity = calcValues(values.message_2_opacity_in, currentYOffset);
                    objs.message_2.style.transform = `translate3d(0, ${calcValues(values.message_2_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.message_2.style.opacity = calcValues(values.message_2_opacity_out, currentYOffset);
                    objs.message_2.style.transform = `translate3d(0, ${calcValues(values.message_2_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.message_3.style.opacity = calcValues(values.message_3_opacity_in, currentYOffset);
                    objs.message_3.style.transform = `translate3d(0, ${calcValues(values.message_3_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.message_3.style.opacity = calcValues(values.message_3_opacity_out, currentYOffset);
                    objs.message_3.style.transform = `translate3d(0, ${calcValues(values.message_3_translateY_out, currentYOffset)}%, 0)`;
                }
                break;
            case 2:

                // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                if (scrollRatio <= 0.5) {
                    // in
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    // out
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    // in
                    objs.message_0.style.opacity = calcValues(values.message_0_opacity_in, currentYOffset);
                    objs.message_0.style.transform = `translate3d(0, ${calcValues(values.message_0_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.message_0.style.opacity = calcValues(values.message_0_opacity_out, currentYOffset);
                    objs.message_0.style.transform = `translate3d(0, ${calcValues(values.message_0_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    // in
                    objs.message_1.style.transform = `translate3d(0, ${calcValues(values.message_1_translateY_in, currentYOffset)}%, 0)`;
                    objs.message_1.style.opacity = calcValues(values.message_1_opacity_in, currentYOffset);
                    if(scrollRatio >= 0.6)
                        objs.pin_1.style.transform = `scaleY(${calcValues(values.pin_1_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.message_1.style.transform = `translate3d(0, ${calcValues(values.message_1_translateY_out, currentYOffset)}%, 0)`;
                    objs.message_1.style.opacity = calcValues(values.message_1_opacity_out, currentYOffset);
                    objs.pin_1.style.transform = `scaleY(${calcValues(values.pin_1_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.93) {
                    // in
                    objs.message_2.style.transform = `translate3d(0, ${calcValues(values.message_2_translateY_in, currentYOffset)}%, 0)`;
                    objs.message_2.style.opacity = calcValues(values.message_2_opacity_in, currentYOffset);
                    objs.pin_2.style.transform = `scaleY(${calcValues(values.pin_2_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.message_2.style.transform = `translate3d(0, ${calcValues(values.message_2_translateY_out, currentYOffset)}%, 0)`;
                    objs.message_2.style.opacity = calcValues(values.message_2_opacity_out, currentYOffset);
                    objs.pin_2.style.transform = `scaleY(${calcValues(values.pin_2_scaleY, currentYOffset)})`;
                }

                // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
                if (scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    // 가로/세로 모두 꽉 차게 하기 위해서 여기서 세팅(계산 필요)
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;

                    if (widthRatio <= heightRatio) {
                        // 캔버스보다 브라우저가 홀쭉한 경우
                        canvasScaleRatio = heightRatio;
                    } else {
                        // // 캔버스보다 브라우저가 납작한 경우
                        canvasScaleRatio = widthRatio;
                    }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0], 0, 0);

                    // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                    //                                  (scroll 영역 뺀 너비)
                    const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                    // const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                    const whiteRectWidth = recalculatedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                    //좌우 흰색 박스 그리기        x          y            width                   height
                    // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                    // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                    objs.context.fillRect(
                        values.rect1X[0],
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                    );
                    objs.context.fillRect(
                        values.rect2X[0],
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                    );
                }
                break;
            case 3:
                // 가로/세로 모두 꽉 차게 하기 위해서 여기서 세팅(계산 필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저가 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                } else {
                    // // 캔버스보다 브라우저가 납작한 경우
                    canvasScaleRatio = widthRatio;
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                //                                  (scroll 영역 뺀 너비)
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                // const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                
                if (!values.rectStartY) {
                    // 이 아래거는 스크롤 속도에 따라 값이 변함
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;

                    // 화면 최상단부터 canvas까지의 거리(position:absolute일경우)
                    // 현재 화면의 상단부터 canvas까지의 거리(position:relative일 경우)
                    // 그리고 transform이 적용 안된 canvas 크기를 기준
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2; 
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }

                const whiteRectWidth = recalculatedInnerWidth * 0.15;
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                //좌우 흰색 박스 그리기        x          y            width                   height
                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currentYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                );
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currentYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                );
                // 캔버스가 브라우저 상단에 닿지 않았다면
                if (scrollRatio < values.rect1X[2].end) {
                    objs.canvas.classList.remove('sticky');
                }
                // 캔버스가 브라우저 상단에 닿았을 때
                else {
                    // 이미지 블렌드
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end;
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                    const blendHeight = calcValues(values.blendHeight, currentYOffset);
                    
                    objs.context.drawImage(objs.images[1],
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                    );

                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                    if (scrollRatio > values.blendHeight[2].end) {
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (objs.canvas.width * 1.5);
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = '0px';
                    }

                    if (values.canvas_scale[2].end
                        && scrollRatio > values.canvas_scale[2].end) {
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
                        values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%,0)`;
                    }
                }

                break;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        enterNewScene = false;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;

        }
        if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            if (currentScene === sceneInfo.length - 1) return;
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (delayedYOffset < prevScrollHeight) {
            if (currentScene === 0) return;
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (enterNewScene) return;
        playAnimation();        
    }

    function loop() {
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (!enterNewScene) {
            const currentYOffset = delayedYOffset - prevScrollHeight;
            const values = sceneInfo[currentScene].values;
            const objs = sceneInfo[currentScene].objs;
            if (currentScene === 0) {
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                if (objs.videoImages[sequence])
                    objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            } else if (currentScene === 2) {
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                if (objs.videoImages[sequence2])
                    objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
            }

        }
        // 추가 코드
        // home이나 end를 이용해 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
        // home 키로 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
        if (delayedYOffset < 1) {
            scrollLoop();
            sceneInfo[0].objs.canvas.style.opacity = 1;
            sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
        }
        // end 키로 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
        if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            let tempYOffset = yOffset;
            scrollTo(0, tempYOffset - 1);
        }
        rafId = requestAnimationFrame(loop);

        if (Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }

    

    // DOMContentLoaded은 DOM만 되면 하는거, load는 이미지 같은거 다 되면 하는거
    window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

        let tempYOffset = yOffset;
        let tempScrollCount = 0;
        if (tempYOffset > 0) {
            let siId = setInterval(() => {
                window.scrollTo(0, tempYOffset);
                tempYOffset += 5;
                if (tempScrollCount++ > 20) {
                    clearInterval(siId);
                }
            }, 20);
        }

        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            
            scrollLoop();
            checkMenu();

            if (!rafState) {
                rafId = requestAnimationFrame(loop);
                rafState = true;
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                setLayout();
                sceneInfo[3].values.rectStartY = 0;
            }
            if (currentScene === 3) {
                // 추가 코드
                // Scene 3의 요소들은 위치나 크기가 미리 정해지지 않고
                // 현재 창 사이즈나 스크롤 위치에 따라 가변적으로 변하기 때문에
                // 리사이즈에 일일이 대응시키기가 까다롭습니다.
                // Scene 3에 진입 시점에 요소들의 위치와 크기가 결정이 되는 특징을 이용해서
                // 현재 Scene이 3일 경우에는 좀 위로 스크롤이 되도록 해서
                // Scene 3의 시작 지점 이전으로 돌리는 식으로 요소들의 레이아웃이 깨지는 현상을 방지해 줍니다.
                // 시작 지점 이전으로 스크롤을 이동 시키는 동작은
                // 바로 위 518 라인의 자동 스크롤 코드를 그대로 활용했습니다.
                let tempYOffset = yOffset;
                let tempScrollCount = 0;
                if (tempYOffset > 0) {
                    let siId = setInterval(() => {
                        scrollTo(0, tempYOffset);
                        tempYOffset -= 50;

                        if (tempScrollCount > 20) {
                            clearInterval(siId);
                        }
                        tempScrollCount++;
                    }, 20);
                }
            }
        });

        // 폰에서 가로 세로 바꾸는 경우(iPhone 땜시)
        window.addEventListener('orientationchange', () => {
            setTimeout(setLayout, 500);
        });
        document.querySelector('.loading').addEventListener('transitionend', (event) => {
            document.body.removeChild(event.currentTarget);
        })
    });

    setCanvasImages();

})();
