export class ModeToggle {
    static get MODE_KEY() {
      return "mode";
    }
    static get DARK_MODE() {
      return "dark";
    }
    static get LIGHT_MODE() {
      return "light";
    }
    constructor() {
      if (this.hasMode) {
        if (this.isDarkMode) {
          if (!this.isSysDarkPrefer) {
            this.setDark();
          }
        } else {
          if (this.isSysDarkPrefer) {
            this.setLight();
          }
        }
      }else {
          if(window.inzj.defaultTheme === 'dark'){
              this.setDark();
          }else if(window.inzj.defaultTheme === 'light'){
              this.setLight();
          }
      }
      var self = this;
      // 根据时间判断是否切换主题
        if(window.inzj.autoTheme == true){
            const date = new Date()
            const hour = date.getHours();
            // console.log(hour)
            if (hour >= 0 && hour < 18){
                this.setLight();
            }else {
                this.setDark();
            }
        }
      /* always follow the system prefers */ this.sysDarkPrefers.addListener(
        function () {
          if (self.hasMode) {
            if (self.isDarkMode) {
              if (!self.isSysDarkPrefer) {
                self.setDark();
              }
            } else {
              if (self.isSysDarkPrefer) {
                self.setLight();
              }
            }
            self.clearMode();
          }
          self.updateMermaid();
        }
      );
    }
    /* constructor() */
    setDark() {
      $("html").attr(ModeToggle.MODE_KEY, ModeToggle.DARK_MODE);
      localStorage.setItem(
        ModeToggle.MODE_KEY,
        ModeToggle.DARK_MODE
      );
    }
    setLight() {
      $("html").attr(ModeToggle.MODE_KEY, ModeToggle.LIGHT_MODE);
      localStorage.setItem(
        ModeToggle.MODE_KEY,
        ModeToggle.LIGHT_MODE
      );
    }
    clearMode() {
      $("html").removeAttr(ModeToggle.MODE_KEY);
      localStorage.removeItem(ModeToggle.MODE_KEY);
    }
    get sysDarkPrefers() {
      return window.matchMedia("(prefers-color-scheme: dark)");
    }
    get isSysDarkPrefer() {
      return this.sysDarkPrefers.matches;
    }
    get isDarkMode() {
      return this.mode == ModeToggle.DARK_MODE;
    }
    get isLightMode() {
      return this.mode == ModeToggle.LIGHT_MODE;
    }
    get hasMode() {
      return this.mode != null;
    }
    get mode() {
      return localStorage.getItem(ModeToggle.MODE_KEY);
    }
    /* get the current mode on screen */ get modeStatus() {
      if (
        this.isDarkMode ||
        (!this.hasMode && this.isSysDarkPrefer)
      ) {
        return ModeToggle.DARK_MODE;
      } else {
        return ModeToggle.LIGHT_MODE;
      }
    }
    updateMermaid() {
      if (typeof mermaid !== "undefined") {
        let expectedTheme =
          this.modeStatus === ModeToggle.DARK_MODE
            ? "dark"
            : "default";
        let config = { theme: expectedTheme };
        /* re-render the SVG › <https://github.com/mermaid-js/mermaid/issues/311#issuecomment-332557344> */ $(
          ".mermaid"
        ).each(function () {
          let svgCode = $(this).prev().children().html();
          $(this).removeAttr("data-processed");
          $(this).html(svgCode);
        });
        mermaid.initialize(config);
        mermaid.init(undefined, ".mermaid");
      }
    }
    flipMode() {
      if (this.hasMode) {
        if (this.isSysDarkPrefer) {
          if (this.isLightMode) {
            this.clearMode();
          } else {
            this.setLight();
          }
        } else {
          if (this.isDarkMode) {
            this.clearMode();
          } else {
            this.setDark();
          }
        }
      } else {
        if (this.isSysDarkPrefer) {
          this.setLight();
        } else {
          this.setDark();
        }
      }
      this.updateMermaid();
    } /* flipMode() */
  }
