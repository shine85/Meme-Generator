const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

const imageInput = document.getElementById('imageInput');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const fontSizeInput = document.getElementById('fontSize');
const downloadBtn = document.getElementById('downloadBtn');

let currentImage = null;

// 初始化：画一个白色背景
function initCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('请上传图片', canvas.width / 2, canvas.height / 2);
}

// 核心渲染函数
function drawMeme() {
    // 1. 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 绘制图片 (如果有)
    if (currentImage) {
        // 让图片适应画布大小 (这里简单处理，强制拉伸，可优化为保持比例)
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 3. 设置文字样式 (经典的表情包样式：白字黑边)
    const fontSize = fontSizeInput.value;
    ctx.font = `bold ${fontSize}px Impact, Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = 'center';

    // 4. 绘制顶部文字
    const topText = topTextInput.value.toUpperCase();
    ctx.textBaseline = 'top';
    ctx.strokeText(topText, canvas.width / 2, 20);
    ctx.fillText(topText, canvas.width / 2, 20);

    // 5. 绘制底部文字
    const bottomText = bottomTextInput.value.toUpperCase();
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
}

// 监听图片上传
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                // 重设画布尺寸以匹配图片比例 (可选，这里为了简单固定了500x500，你也可以动态调整canvas.width)
                // canvas.width = img.width;
                // canvas.height = img.height;
                drawMeme();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 监听输入变化，实时重绘
[topTextInput, bottomTextInput, fontSizeInput].forEach(input => {
    input.addEventListener('input', drawMeme);
});

// 下载功能
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvas.toDataURL();
    link.click();
});

// 启动
initCanvas();
drawMeme();