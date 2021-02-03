patterns = Pattern.create([
  { name: "arrows", 
    style: "background: linear-gradient(45deg, rgba(COLOR1,1) 45px, transparent 45px) 64px 64px, linear-gradient(45deg, rgba(COLOR1,1) 45px, transparent 45px, transparent 91px, rgba(COLOR2,1) 91px, rgba(COLOR2,1) 135px, transparent 135px), linear-gradient(-45deg, rgba(COLOR1,1) 23px, transparent 23px, transparent 68px, rgba(COLOR1,1) 68px, rgba(COLOR1,1) 113px, transparent 113px, transparent 158px, rgba(COLOR1,1) 158px); background-color: rgba(COLOR2,1); background-size: 128px 128px;" },
  { name: "blobby",
    style: "background: radial-gradient(circle at 0% 50%, rgba(COLOR1, 0) 9px, rgba(COLOR1, 1) 10px, rgba(COLOR1, 0) 11px) 0px 10px, radial-gradient(at 100% 100%, rgba(COLOR1, 0) 9px, rgba(COLOR1, 1) 10px, rgba(COLOR1, 0) 11px), rgba(COLOR2, 1); background-size: 20px 20px;" }, 
  { name: "tile",
    style: "background: linear-gradient(135deg, rgba(COLOR1,1) 21px, rgba(COLOR2,1) 22px, rgba(COLOR2,1) 24px, transparent 24px, transparent 67px, rgba(COLOR2,1) 67px, rgba(COLOR2,1) 69px, transparent 69px), linear-gradient(225deg, rgba(COLOR1,1) 21px, rgba(COLOR2,1) 22px, rgba(COLOR2,1) 24px, transparent 24px, transparent 67px, rgba(COLOR2,1) 67px, rgba(COLOR2,1) 69px, transparent 69px) 0 64px; background-color: rgba(COLOR1,1); background-size: 64px 128px;" }, 
  { name: "hearts",
    style: "background: radial-gradient(circle closest-side at 60% 43%, rgba(COLOR1,1) 26%, rgba(COLOR1,0) 27%), radial-gradient(circle closest-side at 40% 43%, rgba(COLOR1,1) 26%, rgba(COLOR1,0) 27%), radial-gradient(circle closest-side at 40% 22%, rgba(COLOR2,1) 45%, rgba(COLOR2,0) 46%), radial-gradient(circle closest-side at 60% 22%, rgba(COLOR2,1) 45%, rgba(COLOR2,0) 46%), radial-gradient(circle closest-side at 50% 35%, rgba(COLOR2,1) 30%, rgba(COLOR2,0) 31%), radial-gradient(circle closest-side at 60% 43%, rgba(COLOR1,1) 26%, rgba(COLOR1,0) 27%) 50px 50px, radial-gradient(circle closest-side at 40% 43%, rgba(COLOR1,1) 26%, rgba(COLOR1,0) 27%) 50px 50px, radial-gradient(circle closest-side at 40% 22%, rgba(COLOR2,1) 45%, rgba(COLOR2,0) 46%) 50px 50px, radial-gradient(circle closest-side at 60% 22%, rgba(COLOR2,1) 45%, rgba(COLOR2,0) 46%) 50px 50px, radial-gradient(circle closest-side at 50% 35%, rgba(COLOR2,1) 30%, rgba(COLOR2,0) 31%) 50px 50px; background-color: rgba(COLOR1,1); background-size: 100px 100px;" }, 
  { name: "socks",
    style: "background-color: rgba(COLOR2,1); background-image: repeating-linear-gradient(120deg, rgba(COLOR3,.2), rgba(COLOR3,.2) 2px, transparent 2px, transparent 60px), repeating-linear-gradient(60deg, rgba(COLOR3,.2), rgba(COLOR3,.2) 2px, transparent 2px, transparent 60px), linear-gradient(60deg, rgba(COLOR1,.1) 25%, transparent 25%, transparent 75%, rgba(COLOR1,.1) 75%, rgba(COLOR1,.1)), linear-gradient(120deg, rgba(COLOR1,.1) 25%, transparent 25%, transparent 75%, rgba(COLOR1,.1) 75%, rgba(COLOR1,.1)); background-size: 70px 120px;" },
  { name: "stars",
    style: "background: linear-gradient(324deg, rgba(COLOR1,1) 4%, transparent 4%) -70px 43px, linear-gradient(36deg, rgba(COLOR1,1) 4%, transparent 4%) 30px 43px, linear-gradient(72deg, rgba(COLOR2,1) 8.5%, transparent 8.5%) 30px 43px, linear-gradient(288deg, rgba(COLOR2,1) 8.5%, transparent 8.5%) -70px 43px, linear-gradient(216deg, rgba(COLOR2,1) 7.5%, transparent 7.5%) -70px 23px, linear-gradient(144deg, rgba(COLOR2,1) 7.5%, transparent 7.5%) 30px 23px, linear-gradient(324deg, rgba(COLOR1,1) 4%, transparent 4%) -20px 93px, linear-gradient(36deg, rgba(COLOR1,1) 4%, transparent 4%) 80px 93px, linear-gradient(72deg, rgba(COLOR2,1) 8.5%, transparent 8.5%) 80px 93px, linear-gradient(288deg, rgba(COLOR2,1) 8.5%, transparent 8.5%) -20px 93px, linear-gradient(216deg, rgba(COLOR2,1) 7.5%, transparent 7.5%) -20px 73px, linear-gradient(144deg, rgba(COLOR2,1) 7.5%, transparent 7.5%) 80px 73px; background-color: rgba(COLOR1,1); background-size: 100px 100px;" }, 
  { name: "waves",
    style: "background-color: rgba(COLOR1,1); background-image: radial-gradient(circle at 100% 150%, rgba(COLOR1,1) 24%, rgba(COLOR2,1) 24%, rgba(COLOR2,1) 28%, rgba(COLOR1,1) 28%, rgba(COLOR1,1) 36%, rgba(COLOR2,1) 36%, rgba(COLOR2,1) 40%, transparent 40%, transparent), radial-gradient(circle at 0 150%, rgba(COLOR1,1) 24%, rgba(COLOR2,1) 24%, rgba(COLOR2,1) 28%, rgba(COLOR1,1) 28%, rgba(COLOR1,1) 36%, rgba(COLOR2,1) 36%, rgba(COLOR2,1) 40%, transparent 40%, transparent), radial-gradient(circle at 50%  100%, rgba(COLOR2,1) 10%, rgba(COLOR1,1) 10%, rgba(COLOR1,1) 23%, rgba(COLOR2,1) 23%, rgba(COLOR2,1) 30%, rgba(COLOR1,1) 30%, rgba(COLOR1,1) 43%, rgba(COLOR2,1) 43%, rgba(COLOR2,1) 50%, rgba(COLOR1,1) 50%, rgba(COLOR1,1) 63%, rgba(COLOR2,1) 63%, rgba(COLOR2,1) 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, rgba(COLOR2,1) 5%, rgba(COLOR1,1) 5%, rgba(COLOR1,1) 15%, rgba(COLOR2,1) 15%, rgba(COLOR2,1) 20%, rgba(COLOR1,1) 20%, rgba(COLOR1,1) 29%, rgba(COLOR2,1) 29%, rgba(COLOR2,1) 34%, rgba(COLOR1,1) 34%, rgba(COLOR1,1) 44%, rgba(COLOR2,1) 44%, rgba(COLOR2,1) 49%, transparent 49%, transparent), radial-gradient(circle at 0 50%, rgba(COLOR2,1) 5%, rgba(COLOR1,1) 5%, rgba(COLOR1,1) 15%, rgba(COLOR2,1) 15%, rgba(COLOR2,1) 20%, rgba(COLOR1,1) 20%, rgba(COLOR1,1) 29%, rgba(COLOR2,1) 29%, rgba(COLOR2,1) 34%, rgba(COLOR1,1) 34%, rgba(COLOR1,1) 44%, rgba(COLOR2,1) 44%, rgba(COLOR2,1) 49%, transparent 49%, transparent); background-size: 100px 50px;" }, 
  { name: "stitchpin",
    style: "background: radial-gradient(rgba(COLOR1,1) 3px, transparent 4px), radial-gradient(rgba(COLOR1,1) 3px, transparent 4px), linear-gradient(rgba(COLOR2,1) 4px, transparent 0), linear-gradient(45deg, transparent 74px, transparent 75px, rgba(COLOR3,1) 75px, rgba(COLOR3,1) 76px, transparent 77px, transparent 109px), linear-gradient(-45deg, transparent 75px, transparent 76px, rgba(COLOR3,1) 76px, rgba(COLOR3,1) 77px, transparent 78px, transparent 109px), rgba(COLOR2,1); background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px; background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;" }, 
  { name: "cubic",
    style: "background-color: rgba(COLOR1,1); background-image: linear-gradient(30deg, rgba(COLOR2,1) 12%, transparent 12.5%, transparent 87%, rgba(COLOR2,1) 87.5%, rgba(COLOR2,1)), linear-gradient(150deg, rgba(COLOR2,1) 12%, transparent 12.5%, transparent 87%, rgba(COLOR2,1) 87.5%, rgba(COLOR2,1)), linear-gradient(30deg, rgba(COLOR2,1) 12%, transparent 12.5%, transparent 87%, rgba(COLOR2,1) 87.5%, rgba(COLOR2,1)), linear-gradient(150deg, rgba(COLOR2,1) 12%, transparent 12.5%, transparent 87%, rgba(COLOR2,1) 87.5%, rgba(COLOR2,1)), linear-gradient(60deg, rgba(COLOR3,1) 25%, transparent 25.5%, transparent 75%, rgba(COLOR3,1) 75%, rgba(COLOR3,1)), linear-gradient(60deg, rgba(COLOR3,1) 25%, transparent 25.5%, transparent 75%, rgba(COLOR3,1) 75%, rgba(COLOR3,1)); background-size: 80px 140px; background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;" }, 
  { name: "zigzag",
    style: "background-color: rgba(COLOR1,1); background-size: 58px 58px; background-position: 0px 2px, 4px 35px, 29px 31px, 33px 6px, 0px 36px, 4px 2px, 29px 6px, 33px 30px; background-image: linear-gradient(335deg, rgba(COLOR2,1) 23px, transparent 23px), linear-gradient(155deg, rgba(COLOR2,1) 23px, transparent 23px), linear-gradient(335deg, rgba(COLOR2,1) 23px, transparent 23px), linear-gradient(155deg, rgba(COLOR2,1) 23px, transparent 23px), linear-gradient(335deg, rgba(COLOR2,1) 10px, transparent 10px), linear-gradient(155deg, rgba(COLOR2,1) 10px, transparent 10px), linear-gradient(335deg, rgba(COLOR2,1) 10px, transparent 10px), linear-gradient(155deg, rgba(COLOR2,1) 10px, transparent 10px);" }
])

palettes = Palette.create([
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(1) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(2) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(3) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(4) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "130,130,130",
    color3: "255,255,255",
    pattern: Pattern.find(5) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(6) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    pattern: Pattern.find(7) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    color3: "130,130,130",
    pattern: Pattern.find(8) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    color3: "130,130,130",
    pattern: Pattern.find(9) },
  { name: "b&w",
    color1: "0,0,0",
    color2: "255,255,255",
    color3: "130,130,130",
    pattern: Pattern.find(10) }
])