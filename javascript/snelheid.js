const sel = document.querySelector.bind(document);

const canvas = sel('canvas');
const c = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;
const MIDX = Math.floor(W/2);
const MIDY = Math.floor(H/2);
const MINSPEED = 180;
const MAXSPEED = 340;
const JITTER = 0.5;
const ACCELERATION = 0.2;
let prev = null;
let speed = MINSPEED;

requestAnimationFrame(updateMeter);

function updateMeter(curr)
{
  if(!prev)prev = curr;

  const delta = curr - prev;
  prev = curr;
  speed += delta * ACCELERATION;

  if(speed > MAXSPEED)
  {
    speed = MAXSPEED - Math.random() * delta * JITTER;
  }
  else if(speed < MINSPEED)
  {
    speed = MINSPEED + Math.random() * delta * 0.1;
  }

  meter(speed);

  requestAnimationFrame(updateMeter);
}

//meter(280, 100, 100);

function meter(angle = 280, centerX = MIDX, centerY = MIDY, radius = 100)
{
  c.fillStyle = 'white';
  c.fillRect(0, 0, W, H);

  spokes(centerX, centerY, 5, 85, 5, 345, 185, 2, '#ffff00')
  spokes(centerX, centerY);
  finalLine(angle, '#ff0000', 4, centerX, centerY);
  arc(centerX, centerY, '#ff00ff', 3, 180, 350, radius - 80, 'butt');
  arc(centerX, centerY, '#00ACC1', 3, 180, 350, radius - 85, 'butt');
  arc(centerX, centerY, '#ff00ff', 8, 180, 340, radius);
  arc(centerX, centerY, '#ffff00', 5, 180, angle, radius);
  c.fillText(Math.floor(angle), centerX - 20, centerY + 30);
}

function d(x){ return (Math.PI / 180) * x; }

function finalLine(angle = 340, color = '#ff0000', width = 4, centerX = MIDX, centerY = MIDY)
{
  let p1 = polarToCartesian(15, angle);
  let p2 = polarToCartesian(100, angle);
  c.beginPath();
  c.strokeStyle = color;
  c.lineWidth = width;
  c.moveTo(centerX + p1.x, centerY +  p1.y);
  c.lineTo(centerX + p2.x, centerY +  p2.y);
  c.stroke();
}

function arc(centerX = MIDX, centerY = MIDY, arcColor = '#ff00ff', arcWidth = 8, startAngle = 180, endAngle = 340, radius = MIDX - 100, arcCap = 'round')
{
  c.beginPath();
  c.strokeStyle = arcColor;
  c.lineWidth = arcWidth;
  c.lineCap = arcCap;
  c.arc(centerX, centerY, radius, d(startAngle), d(endAngle), false);
  c.stroke();
}

function polarToCartesian(radius, angle)
{
  return {x: radius * Math.cos(d(angle)), y: radius * Math.sin(d(angle))};
}

function spokes(centerX = MIDX, centerY = MIDY, stepAngle = 20, radius = 80, spokeLength = 10, last = 350, startAngle = 180, spokeWidth = 4, spokeColor = '#00ffff')
{
  c.beginPath();
  c.strokeStyle = spokeColor;
  c.lineWidth = spokeWidth;
  c.lineCap = 'butt';

  for(let currAngle = startAngle; currAngle < last; currAngle += stepAngle)
  {
    let p1 = polarToCartesian(radius, currAngle);
    c.moveTo(centerX + p1.x, centerY + p1.y);
    let p2 = polarToCartesian(radius + spokeLength, currAngle);
    c.lineTo(centerX + p2.x, centerY + p2.y);
  }
  c.stroke();
}