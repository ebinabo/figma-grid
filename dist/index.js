/**
 * Figma Layout grid for the web
 * @module FigmaGrid
 * @author ebinabo
 * @version 1.0.0
 */

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

const fgIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS(null, 'width', 128)
    svg.setAttributeNS(null, 'height', 128)
    svg.setAttributeNS(null, 'fill', 'blue')
    svg.setAttributeNS(null, 'viewBox', '0 0 128 128')
    svg.setAttribute('style', `
        height: 24px; 
        width: 24px;
        position: fixed;
        bottom: 16px;
        right: 16px;
        opacity: .5;
        z-index: 1001;
    `)
    svg.innerHTML += `
        <rect width="128" height="128" fill="#F5EEEE"/>
        <rect x="4" y="4" width="89" height="58" fill="#F24E1E"/>
        <rect x="66" y="66" width="27" height="58" fill="#1ABCFE"/>
        <rect x="97" y="35" width="27" height="89" fill="#0ACF83"/>
        <rect x="97" y="4" width="27" height="27" fill="#FF7262"/>
        <rect x="4" y="66" width="58" height="58" fill="#A259FF"/>
    `

    svg.onmouseover = e => {
        svg.style.opacity = 1
    }

    svg.onmouseleave = e => {
        svg.style.opacity = .5
    }
    
    return svg
}

const fgControls = props => {
    const controls = document.createElement('form')
    controls.className = 'fg-controls'

    controls.innerHTML = `
        <div class="fg-controls-header">
            <select name="layout" id="layout">
                <option ${props?.layout === 'grid' && 'selected'} value="grid">Grid</option>
                <option ${props?.layout === 'column' && 'selected'} value="column">Column</option>
                <option ${props?.layout === 'row' && 'selected'} value="row">Row</option>
            </select>

            <svg id="visibility" width="737" height="335" viewBox="0 0 737 335" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M732.475 161.8L728.975 158.3C680.675 110 624.275 72.6 561.475 47.1C500.875 22.5 436.675 10 370.875 10C305.175 10 240.975 22.5 180.275 47.1C117.475 72.6 61.175 110 12.775 158.3L9.275 161.8C3.575 167.5 3.575 176.7 9.275 182.3C14.975 188 24.175 188 29.775 182.3L33.275 178.8C78.875 133.2 131.975 97.9 191.175 73.9C248.375 50.7 308.775 38.9 370.775 38.9C432.775 38.9 493.275 50.6 550.375 73.9C606.575 96.7 657.375 129.7 701.375 172C662.975 208.8 619.375 238.8 571.475 261C522.375 283.7 469.975 297.8 415.975 303C307.175 313.3 197.475 285.8 107.075 225.8C100.475 221.4 91.475 223.2 86.875 229.9C82.475 236.5 84.275 245.5 90.975 250.1C173.675 305.1 271.675 334.3 371.075 334.3C386.875 334.3 402.775 333.5 418.575 332.1C475.975 326.7 531.475 311.7 583.675 287.5C637.575 262.5 686.375 228.4 728.875 186L732.375 182.5C735.075 179.8 736.675 176.1 736.675 172.2C736.675 168.3 735.175 164.5 732.475 161.8Z" fill="black"/>
                <path d="M370.875 54.2C305.875 54.2 253.075 107 253.075 172C253.075 237 305.875 289.8 370.875 289.8C402.275 289.8 431.875 277.6 454.075 255.3C476.175 233.1 488.475 203.6 488.675 172.1C488.875 139.4 475.875 108.9 451.975 86.6C446.075 81.1 436.875 81.4 431.475 87.2C425.975 93.1 426.275 102.3 432.075 107.7C449.975 124.5 459.775 147.3 459.675 172C459.475 195.8 450.275 218.1 433.575 234.8C416.775 251.6 394.675 260.7 370.975 260.7C322.075 260.7 282.175 220.9 282.175 171.9C282.175 123 321.975 83.1 370.975 83.1C378.975 83.1 385.475 76.6 385.475 68.6C385.375 60.7 378.875 54.2 370.875 54.2Z" fill="black"/>
                <path d="M370.875 207.1C351.475 207.1 335.775 191.3 335.775 172C335.775 163.8 329.075 157.2 320.875 157.2C312.775 157.3 306.175 164 306.175 172.1C306.175 207.8 335.175 236.8 370.875 236.8C406.575 236.8 435.575 207.8 435.575 172.1C435.575 154.8 428.875 138.6 416.575 126.4C404.375 114.2 388.175 107.5 370.875 107.4H370.575C352.675 107.4 336.075 114.6 323.875 127.6C321.175 130.5 319.675 134.3 319.875 138.2C319.975 142.1 321.675 145.8 324.475 148.5C327.275 151.1 330.875 152.5 334.675 152.5C338.775 152.5 342.675 150.8 345.475 147.8C352.075 140.8 360.975 136.9 370.575 136.9H370.775C380.175 137 389.075 140.6 395.675 147.2C402.275 153.8 405.975 162.6 405.975 171.9C405.975 191.3 390.175 207.1 370.875 207.1Z" fill="black"/>
                <line x1="2.97626" y1="329.428" x2="734.976" y2="5.42785" stroke="black" stroke-width="10"/>
            </svg>

            <div class="close">X</div>
        </div>

        <!-- Row 1 -->
        <div class="fg-controls-count">
            <label for="count">Count</label>
            <input value=${props?.count || 5} type="number" id="count">
        </div>
        <div class="fg-controls-color">
            <label for="color">Color</label>
            <div class="inputs">
                <input disabled type="color" id="color" value="#ff0000">
                <input disabled type="number" id="colorAmount" min="1" max="100" value="10" step="1">
            </div>
        </div>

        <!-- Row 2 -->
        <div class="fg-controls-type">
            <label for="type">Type</label>
            <select disabled name="type" id="type">
                <option value="left">Left</option>
                <option selected value="stretch">Stretch</option>
            </select>
        </div>
        <div class="fg-controls-width">
            <label for="width">Width</label>
            <input disabled type="text" id="width" value="Auto" readonly>
        </div>
        <div class="fg-controls-margin">
            <label for="margin">Margin</label>
            <input value=${props?.margin || 0} type="number" id="margin" min="0" max="100" step="1">
        </div>

        <!-- Row 3 -->
        <div class="fg-controls-gutter">
            <label for="gutter">Gutter</label>
            <input value=${props?.gutter || 20} type="number" id="gutter" min="0" max="100" step="1">
        </div>
        
        <div class="fg-controls-size">
            <label for="size">Size</label>
            <input value=${props?.size || 8} type="number" id="size" min="0" max="100" step="1">
        </div>
    `

    return controls
}

const style = document.createElement('style')
style.innerHTML = `
.fg-hidden {
    opacity: 0;
    transition: opacity .25s linear;
}
.fg-controls {
    width: 240px;
    height: 264px;
    background: #f6f6f8;
    position: fixed;
    right: 16px;
    bottom: 44px;
    padding: 0 8px;
    z-index: 1001;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 40% 40% 20%;
        grid-template-columns: 40% 40% 20%;
    -ms-grid-rows: 1.25fr 2fr 2fr 2fr;
        grid-template-rows: 1.25fr 2fr 2fr 2fr;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  
  .fg-controls-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / span 3;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .fg-controls-header .close {
      cursor: pointer;
  }

  .fg-controls-header svg {
    height: 16px;
  }
  
  .fg-controls-color {
    -ms-grid-column: 2;
    -ms-grid-column-span: 2;
    grid-column: 2 / span 2;
  }
  
  .fg-controls-color .inputs {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
  }
  
  .fg-controls-color .inputs #colorAmount {
    width: 40px;
  }
  
  .fg-controls-margin #margin {
    width: 40px;
  }
  
  .fg-controls input, .fg-controls select {
    width: 80px;
  }
`

document.head.appendChild(style)

class FigmaGrid {
    constructor(props) {
        this.layout = props?.layout || 'grid'
        this.color = props?.color || 'hsla(0, 100%, 50%, .1)'
        this.el = document.createElement('div')
        this.el.className = 'fg-container'
        this.icon = fgIcon()
        this.controls = fgControls(props)
        this.refresh = this.refresh.bind(this)
        this.setStyle = this.setStyle.bind(this)
        document.body.appendChild(this.icon)
        document.body.appendChild(this.controls)
        document.body.appendChild(this.el)

        this.size = props?.size || 8
        this.count = props?.count || 5
        this.type = 'Stretch'
        this.width = 'auto'
        this.margin = props?.margin || 0
        this.gutter = props?.gutter || 20

        switch(this.layout){
            case 'grid':
                this.el.setAttribute('style', `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100%;
                    background: repeating-linear-gradient(
                        90deg,
                        hsla(0, 100%, 50%, .1) 0 .5px,
                        transparent 0px 100%
                    ),
                        repeating-linear-gradient(
                        hsla(0, 100%, 50%, .1) 0 .5px,
                        transparent 0px 100%
                    );
                    background-size: ${this.size}px ${this.size}px;
                `)
                break
            case 'column':
                // for type stretch & width auto
                this.el.setAttribute('style', `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: calc(100% - ${this.margin * 2}px);
                    display: grid;
                    grid-auto-flow: column;
                    gap: ${this.gutter}px;
                    margin: 0 ${this.margin}px;
                `)

                for(var i=0; i < this.count; i++) {
                    let elem = document.createElement('div')
                    elem.setAttribute('style', `
                        height: 100%;
                        background: ${this.color}
                    `)
                    this.el.append(elem)
                }
                break
            case 'row':
                this.el.setAttribute('style', `
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: ${document.body.scrollHeight}px;
                    width: 100%;
                    display: grid;
                    gap: ${this.gutter}px;
                    margin: 0 ${this.margin}px;
                `)

                for(var i=0; i < this.count; i++) {
                    let elem = document.createElement('div')
                    elem.setAttribute('style', `
                        background: ${this.color}
                    `)
                    this.el.append(elem)
                }
                break
            default:
                break
        }


        // event handlers
        this.controls.layout.onchange = e => {
            this.layout = e.target.value
            this.refresh()
        }
        this.controls.count.onchange = e => {
            this.count = e.target.value
            this.refresh()
        }
        this.controls.margin.onchange = e => {
            this.margin = e.target.value
            this.refresh()
        }
        this.controls.gutter.onchange = e => {
            this.gutter = e.target.value
            this.refresh()
        }
        this.controls.size.onchange = e => {
            this.size = e.target.value
            this.refresh()
        }
        // this.controls.color.onchange = e => {}
        // this.controls.colorAmount.onchange = e => {}
        // this.controls.type.onchange = e => {}
        // this.controls.width.onchange = e => {}

        this.controls.querySelector('#visibility').onclick = e => {
            this.el.classList.toggle('fg-hidden')
            e.target.querySelector('line').classList.toggle('fg-hidden')
            let timeout = setTimeout(() => {
                if (this.el.classList.contains('fg-hidden')) {
                    this.el.style.visibility = 'hidden'
                } else {
                    this.el.style.visibility = 'visible'
                }
                clearTimeout(timeout)
            }, 250)
        }
        
        this.controls.querySelector('.close').onclick = e => {
            this.controls.classList.toggle('fg-hidden')
            let timeout = setTimeout(() => {
                if (this.controls.classList.contains('fg-hidden')) {
                    this.controls.style.visibility = 'hidden'
                } else {
                    this.controls.style.visibility = 'visible'
                }
                clearTimeout(timeout)
            }, 250)
        }
        
        this.icon.onclick = e => {
            this.controls.classList.toggle('fg-hidden')
            let timeout = setTimeout(() => {
                if (this.controls.classList.contains('fg-hidden')) {
                    this.controls.style.visibility = 'hidden'
                } else {
                    this.controls.style.visibility = 'visible'
                }
                clearTimeout(timeout)
            }, 250)
        }
    }

    
    setStyle(layout) {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild)
        }

        switch(layout){
            case 'grid':
                this.el.setAttribute('style', `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100%;
                    background: repeating-linear-gradient(
                        90deg,
                        hsla(0, 100%, 50%, .1) 0 .5px,
                        transparent 0px 100%
                    ),
                        repeating-linear-gradient(
                        hsla(0, 100%, 50%, .1) 0 .5px,
                        transparent 0px 100%
                    );
                    background-size: ${this.size}px ${this.size}px;
                `)
                break
            case 'column':
                // for type stretch & width auto
                this.el.setAttribute('style', `
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: calc(100% - ${this.margin * 2}px);
                    display: grid;
                    grid-auto-flow: column;
                    gap: ${this.gutter}px;
                    margin: 0 ${this.margin}px;
                `)

                for(var i=0; i < this.count; i++) {
                    let elem = document.createElement('div')
                    elem.setAttribute('style', `
                        height: 100%;
                        background: ${this.color}
                    `)
                    this.el.append(elem)
                }
                break
            case 'row':
                this.el.setAttribute('style', `
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: ${document.body.scrollHeight}px;
                    width: 100%;
                    display: grid;
                    gap: ${this.gutter}px;
                    margin: 0 ${this.margin}px;
                `)

                for(var i=0; i < this.count; i++) {
                    let elem = document.createElement('div')
                    elem.setAttribute('style', `
                        background: ${this.color}
                    `)
                    this.el.append(elem)
                }
                break
            default:
                break
        }
    }
    
    
    refresh() {
        this.setStyle(this.layout)
    }
}
