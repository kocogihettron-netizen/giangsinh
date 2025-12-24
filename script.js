const CRUSH_NAME = "Quỳnh Anh";
const MEMORY_TEXT = "Đêm Giáng sinh này, tớ có vài lời muốn nhắn nhủ...";
const BUILD_UP_TEXT = "Cảm ơn cậu vì đã luôn rạng rỡ, nụ cười của cậu thực sự rất xinh đẹp.";
const CONFESSION_MESSAGE = `Tớ định giữ kín chuyện này cho riêng mình, nhưng tớ nhận ra cảm xúc dành cho cậu cứ lớn dần lên theo thời gian. Tớ thích cách cậu cười, thích cả sự hiện diện của cậu trong những ngày qua. Thật lòng, tớ thích cậu.`;

function changePhase(currentId, nextId) {
    const curr = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    
    curr.classList.remove('active');
    setTimeout(() => {
        curr.style.display = 'none';
        next.style.display = 'block';
        setTimeout(() => {
            next.classList.add('active');
            if (nextId === 'phase-3') {
                // Reset phase 3 
                document.getElementById('btn-back-p3').classList.remove('hidden');
                startTypingEffect('confession-text', CONFESSION_MESSAGE, 50);
            }
        }, 50);
    }, 400);
}

function startTypingEffect(elementId, text, speed) {
    const element = document.getElementById(elementId);
    let i = 0; element.innerHTML = '';
    // nút quay lại và nút phản hồi
    document.querySelector('.response-buttons').classList.add('hidden');
    
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i); i++;
        } else {
            clearInterval(interval);
            document.querySelector('.response-buttons').classList.remove('hidden');
        }
    }, speed);
}

function handleResponse(isAccepted) {
    const text = document.getElementById('confession-text');
    const buttonContainer = document.querySelector('.response-buttons');
    const backBtnP3 = document.getElementById('btn-back-p3');
    
    buttonContainer.classList.add('hidden');
    backBtnP3.classList.add('hidden'); // Ẩn nút quay lại 
    
    text.style.transition = "all 1s";
    text.style.color = "#ffd700";
    text.innerHTML = "Cảm ơn cậu vì đã lắng nghe trái tim tớ. Giáng sinh ấm áp nhé! ❤️";

    // xem lại
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = "← Xem lại lời nhắn";
    resetBtn.className = "back-btn";
    resetBtn.style.marginTop = "20px";
    resetBtn.onclick = () => {
        text.style.color = "#f8f9fa";
        text.innerHTML = CONFESSION_MESSAGE;
        buttonContainer.classList.remove('hidden');
        backBtnP3.classList.remove('hidden');
        resetBtn.remove();
    };
    document.querySelector('.confession-box').appendChild(resetBtn);
}

function createSnowflake() {
    const snow = document.createElement('div');
    snow.className = 'snowflake';
    snow.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 4 + 2;
    snow.style.width = snow.style.height = size + 'px';
    snow.style.opacity = Math.random();
    snow.style.animation = `snowfall ${Math.random() * 5 + 5}s linear infinite`;
    document.getElementById('snow-container').appendChild(snow);
    setTimeout(() => snow.remove(), 10000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.to-text').innerHTML = `Gửi <strong>${CRUSH_NAME}</strong>`;
    document.querySelector('.memory-box').innerHTML = MEMORY_TEXT;
    document.querySelector('.final-build-up').innerHTML = BUILD_UP_TEXT;
    
    document.getElementById('btn-p1').addEventListener('click', () => {
        document.getElementById('christmas-music').play().catch(() => {});
        changePhase('phase-1', 'phase-2');
    });
    document.getElementById('btn-p2').addEventListener('click', () => changePhase('phase-2', 'phase-3'));
    setInterval(createSnowflake, 200);
});