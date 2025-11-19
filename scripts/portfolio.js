const display = document.querySelector("body div#display");
const root = document.querySelector(":root");

pictures = ["amethyst_shard.png","angler_pottery_sherd.png","apple.png","armor_stand.png","arrow.png","axolotl_bucket.png","baked_potato.png","bamboo.png","banner_pattern.png","beef.png","bucket.png","chainmail_boots.png","chainmail_chestplate.png","chainmail_helmet.png","chainmail_leggings.png","chorus_fruit.png","clock_00.png","coast_armor_trim_smithing_template.png","compass_20.png","copper_boots.png","copper_chestplate.png","copper_helmet.png","copper_leggings.png","diamond_boots.png","diamond_chestplate.png","diamond_helmet.png","diamond_leggings.png","flow_armor_trim_smithing_template.png","golden_boots.png","golden_chestplate.png","golden_helmet.png","golden_leggings.png","iron_boots.png","iron_chestplate.png","iron_helmet.png","iron_leggings.png","lava_bucket.png","mace.png","netherite_boots.png","netherite_chestplate.png","netherite_helmet.png","netherite_leggings.png","pancakes.png","phantom_membrane.png","popped_chorus_fruit.png","porkchop.png","quartz.png","quiver.png","recovery_compass_20.png","rib_armor_trim_smithing_template.png","salmon_bucket.png","shulker_shell.png","slime_ball.png","sniffer_egg.png","the_cooler_shoes.png","totem_of_undying.png","trident.png","tropical_fish_bucket.png","water_bucket.png","wayfinder_armor_trim_smithing_template.png","wild_armor_trim_smithing_template.png"]

let scale = 256;
let window_width = window.innerWidth;
let window_height = window.innerHeight;
let x = 0;
let y = 0;
let x_vel = 0;
let y_vel = 0;
let is_dragging = false;
let was_dragged = false;
let mouse_x = 0;
let mouse_y = 0;
let last_mouse_x = 0;
let last_mouse_y = 0;
let displayed_cells = [];
let cells_to_render = [[0,0]];
let cells_to_unrender = [];
let rendered_cells = [];

root.style.setProperty("--scale", scale+"px");
if (window_width < 640 || window_height < 480) {
    scale = 192;
    root.style.setProperty("--scale", scale+"px");
}
root.style.setProperty("--window-width", window_width);
root.style.setProperty("--window-height", window_height);
root.style.setProperty("--x", x);
root.style.setProperty("--y", y);

window.addEventListener("resize", () => {
    window_width = window.innerWidth;
    window_height = window.innerHeight;
    root.style.setProperty("--window-width", window_width);
    root.style.setProperty("--window-height", window_height);
});

window.addEventListener("mousedown", (e) => {
    e.preventDefault();
    is_dragging = true;
    was_dragged = true;
    mouse_x = e.clientX;
    mouse_y = e.clientY;
    last_mouse_x = e.clientX;
    last_mouse_y = e.clientY;
    x_vel = 0;
    y_vel = 0;
});

window.addEventListener("touchstart", (e) => {
    const firstTouch = e.touches[0];
    is_dragging = true;
    was_dragged = true;
    mouse_x = firstTouch.clientX;
    mouse_y = firstTouch.clientY;
    last_mouse_x = firstTouch.clientX;
    last_mouse_y = firstTouch.clientY;
    x_vel = 0;
    y_vel = 0;
});

window.addEventListener("mousemove", (e) => {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
})

window.addEventListener("touchmove", (e) => {
    const firstTouch = e.touches[0];
    mouse_x = firstTouch.clientX;
    mouse_y = firstTouch.clientY;
})

window.addEventListener("mouseup", (e) => {
    is_dragging = false;

});

window.addEventListener("touchend", (e) => {
    is_dragging = false;
});

window.addEventListener("touchcancel", (e) => {
    is_dragging = false;
});

const keys = {};

window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

let scroll = 0;

window.addEventListener('wheel', e => {
  scroll += e.deltaY;
  window.scrollTo(0, 0);
});

function includesArray(arr, target) {
    return arr.some(a => a.length === target.length && a.every((v, i) => v === target[i]));
}

function arrayDifference(arr1, arr2) {
    const isEqual = (a, b) => {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every((v, i) => isEqual(v, b[i]));
      }
      return a === b;
    };
    return arr1.filter(item1 => !arr2.some(item2 => isEqual(item1, item2)));
}

function update(dt) {

    if (keys["arrowright"] || keys["d"]) x_vel -= 400 * dt;
    if (keys["arrowleft"]  || keys["a"])  x_vel += 400 * dt;
    if (keys["arrowup"]    || keys["w"])    y_vel += 400 * dt;
    if (keys["arrowdown"]  || keys["s"])  y_vel -= 400 * dt;

    if (scroll) y_vel -= scroll * 50 * dt;
    scroll = 0;

    if (x_vel > 10000 || x_vel < -10000 || y_vel > 10000 || y_vel < -10000) {
        x_vel *= 0.7;
        y_vel *= 0.7;
    }
    if (x_vel > 900 || x_vel < -900 || y_vel > 900 || y_vel < -900) {
        x_vel *= 0.9;
        y_vel *= 0.9;
    }

    if (x_vel > 0) {
        x_vel -= 100 * dt;
        x_vel = Math.max(x_vel, 0);
    } else if (x_vel < 0) {
        x_vel += 100 * dt;
        x_vel = Math.min(x_vel, 0);
    }

    if (y_vel > 0) {
        y_vel -= 100 * dt;
        y_vel = Math.max(y_vel, 0);
    } else if (y_vel < 0) {
        y_vel += 100 * dt;
        y_vel = Math.min(y_vel, 0);
    }

    x += x_vel * dt;
    y += y_vel * dt;

    if(is_dragging){
        x_vel = (mouse_x - last_mouse_x)*64;
        y_vel = (mouse_y - last_mouse_y)*64;
        last_mouse_x = mouse_x;
        last_mouse_y = mouse_y;
    }
  
    root.style.setProperty("--x", x);
    root.style.setProperty("--y", y);
}

let last_time = performance.now();

function loop(time) {
    const dt = (time - last_time) / 1000;
    last_time = time;
  
    update(dt);
    requestAnimationFrame(loop);

    if (x_vel >0 || y_vel > 0 || x_vel < 0 || y_vel < 0) {
        renderCells();
    }
}

requestAnimationFrame(loop);

const renderCells = () => {

    let cell_width = Math.ceil(window_width / scale) + 2 + (Math.ceil(window_width / scale)%2);
    let cell_height = Math.ceil(window_height / scale) + 2 + (Math.ceil(window_height / scale)%2);

    displayed_cells = [];

    for (let i = 0; i < cell_width * cell_height; i++) {
        cell_x = i % cell_width - Math.floor(cell_width/2) - Math.floor(x/scale);
        cell_y = Math.floor(i / cell_width) - Math.floor(cell_height/2) + 1 - Math.floor(y/scale);
        if (!includesArray(displayed_cells, [cell_x, cell_y])) {
            displayed_cells.push([cell_x, cell_y]);
        }
        if (includesArray(cells_to_render, [cell_x, cell_y]) || includesArray(rendered_cells, [cell_x, cell_y])) {
            continue;
        } else {
            cells_to_render.push([cell_x, cell_y]);
        }
    }

    cells_to_unrender = arrayDifference(rendered_cells, displayed_cells);

    for (let i = 0; i < cells_to_render.length; i++) {
        let random = Math.floor(Math.random() * pictures.length);
        display.innerHTML += `
        <div class="image" id="x${cells_to_render[i][0]}y${cells_to_render[i][1]}" style="left: calc((${cells_to_render[i][0]} * var(--scale)) + (var(--window-width) * 0.5px - (var(--scale) / 2)) + (var(--x) * 1px)); top: calc((${cells_to_render[i][1]} * var(--scale)) + (var(--window-height) * 0.5px - (var(--scale) / 2)) + (var(--y) * 1px) - var(--scale));">
        <div class="quarter-1" style="background-image: url('./pictures/${pictures[random]}');"></div>
        <div class="quarter-2" style="background-image: url('./pictures/${pictures[random]}');"></div>
        <div class="quarter-3" style="background-image: url('./pictures/${pictures[random]}');"></div>
        <div class="quarter-4" style="background-image: url('./pictures/${pictures[random]}');"></div>
        </div>
        `;
        rendered_cells.push(cells_to_render[i]);
    }
    cells_to_render = [];

        
    for (let i = 0; i < cells_to_unrender.length; i++) {
        document.getElementById(`x${cells_to_unrender[i][0]}y${cells_to_unrender[i][1]}`).remove();
        rendered_cells.splice(rendered_cells.indexOf(cells_to_unrender[i]), 1);
    }
    cells_to_unrender = [];
}
renderCells();