// =======================================================
// I. KHU VỰC CÁ NHÂN HÓA (CHỈ CẦN THAY ĐỔI Ở 3 BIẾN ĐẦU)
// =======================================================
const CRUSH_NAME = "Quỳnh Anh"; 
const MEMORY_TEXT = "Cậu không biết đâu, nhưng sự hiện diện của cậu đã khiến những ngày bình thường của tớ trở nên có ý nghĩa hơn rất nhiều. Cậu là nguồn động lực thầm lặng của tớ.";const BUILD_UP_TEXT = "Cậu đã mang lại sự ấm áp và niềm tin cho cuộc sống của tớ. Và đây là..."; // Điều tích cực

const CONFESSION_MESSAGE = 
    "Nếu cậu là ngọn nến, tớ nguyện làm ánh lửa. Nếu cậu là mùa đông, tớ xin được làm chiếc ôm. Giáng sinh này, giữa muôn vàn ánh đèn lấp lánh, điều tớ ước ao nhất là được cùng cậu bước tiếp. Tớ đã yêu cậu mất rồi. <strong>" + CRUSH_NAME + "</strong>, cậu có đồng ý trở thành 'món quà Giáng sinh vĩnh cửu' của tớ không?";

const TYPING_SPEED = 50; // Tốc độ gõ chữ (ms/ký tự)
let typingInterval; // Biến toàn cục để lưu ID của Interval

// =======================================================
// II. Logic Chuyển Phase & Audio
// =======================================================

const music = document.getElementById('christmas-music');

function playMusic() {
    if (music) {
        music.play().catch(e => {
            console.log("Autoplay blocked. User interaction required.");
        });
    }
}

function changePhase(currentId, nextId) {
    const currentPhase = document.getElementById(currentId);
    const nextPhase = document.getElementById(nextId);

    currentPhase.style.opacity = 0;
    
    setTimeout(() => {
        currentPhase.classList.remove('active');
        currentPhase.style.display = 'none';
        
        nextPhase.style.display = 'block'; 
        nextPhase.classList.add('active'); 
        
        setTimeout(() => {
            nextPhase.style.opacity = 1;
            
            if (nextId === 'phase-3') {
                startTypingEffect('confession-text', CONFESSION_MESSAGE, TYPING_SPEED);
            }
        }, 10); 
        
    }, 500); 
}

// =======================================================
// III. Logic Hiệu ứng Gõ chữ
// =======================================================

function startTypingEffect(elementId, text, speed) {
    // Xóa interval cũ nếu có để tránh lỗi
    if (typingInterval) {
        clearInterval(typingInterval);
    }

    const element = document.getElementById(elementId);
    let i = 0;
    element.innerHTML = ''; 

    // Lưu ID interval vào biến toàn cục
    typingInterval = setInterval(() => { 
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            document.querySelector('.response-buttons').classList.remove('hidden');
        }
    }, speed);
}

// =======================================================
// IV. Logic Xử lý Phản hồi Cuối cùng
// =======================================================

function handleResponse(isAccepted) {
    const confessionPhase = document.getElementById('phase-3');
    const confessionText = document.getElementById('confession-text');
    const responseButtons = document.querySelector('.response-buttons');

    // Ẩn các nút phản hồi
    responseButtons.classList.add('hidden');

    // Dừng hiệu ứng gõ chữ ngay lập tức
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    // Đảm bảo lời tỏ tình được hiển thị đầy đủ nếu người dùng bấm nút sớm
    confessionText.innerHTML = CONFESSION_MESSAGE; 

    if (isAccepted) {
        // Kịch bản CHẤP NHẬN: Rực rỡ và vui vẻ
        confessionPhase.style.background = 'linear-gradient(145deg, #ffd700, #ff8c00)'; 
        confessionPhase.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.9)';
        confessionText.innerHTML = "💖 <strong>Vâng! Giáng sinh này là món quà tuyệt vời nhất!</strong> Cảm ơn cậu! Yêu cậu! 🥂";
        confessionText.style.color = '#B73E3E'; 
    } else {
        // Kịch bản TỪ CHỐI: Nhẹ nhàng và tôn trọng
        confessionPhase.style.background = 'linear-gradient(145deg, #1f364d, #3a546d)'; 
        confessionPhase.style.boxShadow = 'none';
        confessionText.innerHTML = "😊 Không sao cả. Cảm ơn cậu vì đã chân thành. Tớ trân trọng tình bạn này. Chúc cậu một mùa Giáng sinh thật ấm áp nhé!";
        confressionText.style.color = 'white';
    }
}


// =======================================================
// V. Logic Tuyết rơi & Khởi tạo (ĐÃ SỬA LỖI DẤU SAO)
// =======================================================

function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.width = snow.style.height = Math.random() * 3 + 1 + 'px';
    snow.style.opacity = Math.random();
    const animationDuration = Math.random() * 8 + 7;
    snow.style.animation = `snowfall ${animationDuration}s linear infinite`;

    document.getElementById('snow-container').appendChild(snow);
    
    setTimeout(() => {
        snow.remove();
    }, animationDuration * 1000);
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. Gán Nội dung Cá nhân hóa động vào HTML 
    document.querySelector('.to-text').innerHTML = `Gửi <strong>${CRUSH_NAME}</strong> yêu dấu,`;
    document.querySelector('.memory-box').innerHTML = MEMORY_TEXT;
    document.querySelector('.final-build-up').innerHTML = BUILD_UP_TEXT;

    // 2. Gắn sự kiện cho các nút chuyển Phase 
    document.getElementById('btn-p1').addEventListener('click', () => {
        playMusic(); 
        changePhase('phase-1', 'phase-2');
    });

    document.getElementById('btn-p2').addEventListener('click', () => {
        changePhase('phase-2', 'phase-3');
    });

    // 3. GẮN SỰ KIỆN CHO NÚT PHẢN HỒI 
    document.querySelector('.response-buttons .accept').addEventListener('click', () => {
        handleResponse(true);
    });

    document.querySelector('.response-buttons .reject').addEventListener('click', () => {
        handleResponse(false);
    });
    
    // 4. Kích hoạt hiệu ứng tuyết rơi
    setInterval(createSnowflake, 300);
});