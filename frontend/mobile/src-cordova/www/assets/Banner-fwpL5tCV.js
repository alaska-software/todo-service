import { g as getCurrentInstance, i as inject, e as emptyRenderFn, l as layoutKey, f as hSlot, h, j as computed, c as createComponent, a6 as onDeactivated, a as onBeforeUnmount, n as nextTick, ac as vmIsDestroyed, ai as getParentProxy, ag as onUnmounted, a5 as injectProp, aj as Teleport, r as ref, ak as createGlobalNode, al as removeGlobalNode, J as client, Z as isKeyCode, w as watch, a0 as Transition, am as childHasFocus, an as Plugin, ao as isDate, ap as defaultLang, aq as useAlignProps, ar as useAlign, H as createDirective, _ as _export_sfc, k as openBlock, m as createBlock, p as withCtx, t as createVNode, W as createBaseVNode, as as QAvatar, v as toDisplayString, b as withDirectives, z as QBtn, at as Notify, u as createTextVNode, S as createCommentVNode, Q as QIcon } from "./index-D97wSuWx.js";
import { u as useModelToggleEmits, a as useModelToggleProps, b as useTimeout, c as useModelToggle, d as useHistory, e as usePreventScroll, p as pad, k as capitalize } from "./format-DEDBY0uM.js";
import { axiosInstance } from "./axios-DGUhWzp4.js";
import { u as useDarkProps, a as useDark } from "./use-dark-BcG_t4pz.js";
import { a as QBanner } from "./QBanner-B1d7JSmM.js";
const usePageStickyProps = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (v) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(v)
  },
  offset: {
    type: Array,
    validator: (v) => v.length === 2
  },
  expand: Boolean
};
function usePageSticky() {
  const { props, proxy: { $q } } = getCurrentInstance();
  const $layout = inject(layoutKey, emptyRenderFn);
  if ($layout === emptyRenderFn) {
    console.error("QPageSticky needs to be child of QLayout");
    return emptyRenderFn;
  }
  const attach = computed(() => {
    const pos = props.position;
    return {
      top: pos.indexOf("top") !== -1,
      right: pos.indexOf("right") !== -1,
      bottom: pos.indexOf("bottom") !== -1,
      left: pos.indexOf("left") !== -1,
      vertical: pos === "top" || pos === "bottom",
      horizontal: pos === "left" || pos === "right"
    };
  });
  const top = computed(() => $layout.header.offset);
  const right = computed(() => $layout.right.offset);
  const bottom = computed(() => $layout.footer.offset);
  const left = computed(() => $layout.left.offset);
  const style = computed(() => {
    let posX = 0, posY = 0;
    const side = attach.value;
    const dir = $q.lang.rtl === true ? -1 : 1;
    if (side.top === true && top.value !== 0) {
      posY = `${top.value}px`;
    } else if (side.bottom === true && bottom.value !== 0) {
      posY = `${-bottom.value}px`;
    }
    if (side.left === true && left.value !== 0) {
      posX = `${dir * left.value}px`;
    } else if (side.right === true && right.value !== 0) {
      posX = `${-dir * right.value}px`;
    }
    const css = { transform: `translate(${posX}, ${posY})` };
    if (props.offset) {
      css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
    }
    if (side.vertical === true) {
      if (left.value !== 0) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${left.value}px`;
      }
      if (right.value !== 0) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${right.value}px`;
      }
    } else if (side.horizontal === true) {
      if (top.value !== 0) {
        css.top = `${top.value}px`;
      }
      if (bottom.value !== 0) {
        css.bottom = `${bottom.value}px`;
      }
    }
    return css;
  });
  const classes = computed(
    () => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand === true ? "expand" : "shrink"}`
  );
  function getStickyContent(slots) {
    const content = hSlot(slots.default);
    return h(
      "div",
      {
        class: classes.value,
        style: style.value
      },
      props.expand === true ? content : [h("div", content)]
    );
  }
  return {
    $layout,
    getStickyContent
  };
}
const QPageSticky = createComponent({
  name: "QPageSticky",
  props: usePageStickyProps,
  setup(_, { slots }) {
    const { getStickyContent } = usePageSticky();
    return () => getStickyContent(slots);
  }
});
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent?.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index !== -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
const QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    // override useTransitionProps
    transitionHide: String,
    // override useTransitionProps
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    backdropFilter: String,
    position: {
      type: String,
      default: "standard",
      validator: (val) => ["standard", "top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props.persistent !== true && props.noRouteDismiss !== true && props.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props,
      () => defaultTransitions[props.position][0],
      () => defaultTransitions[props.position][1]
    );
    const backdropStyle = computed(() => transitionStyle.value + (props.backdropFilter !== void 0 ? `;backdrop-filter:${props.backdropFilter};-webkit-backdrop-filter:${props.backdropFilter}` : ""));
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm,
      innerRef,
      renderPortalContent,
      "dialog"
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props.position} ${positionClass[props.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props.seamless !== true);
    const onEvents = computed(() => props.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props.maximized);
      showPortal();
      animating.value = true;
      if (props.noFocus !== true) {
        document.activeElement?.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm.proxy.$q.platform.is.ios === true) {
          if (props.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt?.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null) return;
        if (selector !== void 0) {
          const target = node.querySelector(selector);
          if (target !== null) {
            target.focus({ preventScroll: true });
            return;
          }
        }
        if (node.contains(document.activeElement) !== true) {
          node = node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
          node.focus({ preventScroll: true });
        }
      });
    }
    function shake(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props.seamless !== true) {
        if (props.persistent === true || props.noEscDismiss === true) {
          props.maximized !== true && props.noShake !== true && shake();
        } else {
          emit("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props.persistent !== true && props.noBackdropDismiss !== true) {
        hide(e);
      } else if (props.noShake !== true) {
        shake();
      }
    }
    function onFocusChange(evt) {
      if (props.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm.proxy, {
      // expose public methods
      focus,
      shake,
      // private but needed by QSelect
      __updateRefocusTarget(target) {
        refocusTarget = target || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: backdropStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          onClick: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
const MILLISECONDS_IN_DAY = 864e5, MILLISECONDS_IN_HOUR = 36e5, MILLISECONDS_IN_MINUTE = 6e4, defaultMask = "YYYY-MM-DDTHH:mm:ss.SSSZ", token = /\[((?:[^\]\\]|\\]|\\)*)\]|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g, reverseToken = /(\[[^\]]*\])|do|d{1,4}|Mo|M{1,4}|m{1,2}|wo|w{1,2}|Qo|Do|DDDo|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g, regexStore = {};
function getRegexData(mask, dateLocale) {
  const days = "(" + dateLocale.days.join("|") + ")", key = mask + days;
  if (regexStore[key] !== void 0) {
    return regexStore[key];
  }
  const daysShort = "(" + dateLocale.daysShort.join("|") + ")", months = "(" + dateLocale.months.join("|") + ")", monthsShort = "(" + dateLocale.monthsShort.join("|") + ")";
  const map = {};
  let index = 0;
  const regexText = mask.replace(reverseToken, (match) => {
    index++;
    switch (match) {
      case "YY":
        map.YY = index;
        return "(-?\\d{1,2})";
      case "YYYY":
        map.YYYY = index;
        return "(-?\\d{1,4})";
      case "M":
        map.M = index;
        return "(\\d{1,2})";
      case "Mo":
        map.M = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "MM":
        map.M = index;
        return "(\\d{2})";
      case "MMM":
        map.MMM = index;
        return monthsShort;
      case "MMMM":
        map.MMMM = index;
        return months;
      case "D":
        map.D = index;
        return "(\\d{1,2})";
      case "Do":
        map.D = index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "DD":
        map.D = index;
        return "(\\d{2})";
      case "H":
        map.H = index;
        return "(\\d{1,2})";
      case "HH":
        map.H = index;
        return "(\\d{2})";
      case "h":
        map.h = index;
        return "(\\d{1,2})";
      case "hh":
        map.h = index;
        return "(\\d{2})";
      case "m":
        map.m = index;
        return "(\\d{1,2})";
      case "mm":
        map.m = index;
        return "(\\d{2})";
      case "s":
        map.s = index;
        return "(\\d{1,2})";
      case "ss":
        map.s = index;
        return "(\\d{2})";
      case "S":
        map.S = index;
        return "(\\d{1})";
      case "SS":
        map.S = index;
        return "(\\d{2})";
      case "SSS":
        map.S = index;
        return "(\\d{3})";
      case "A":
        map.A = index;
        return "(AM|PM)";
      case "a":
        map.a = index;
        return "(am|pm)";
      case "aa":
        map.aa = index;
        return "(a\\.m\\.|p\\.m\\.)";
      case "ddd":
        return daysShort;
      case "dddd":
        return days;
      case "Q":
      case "d":
      case "E":
        return "(\\d{1})";
      case "do":
        index++;
        return "(\\d{1}(st|nd|rd|th))";
      case "Qo":
        return "(1st|2nd|3rd|4th)";
      case "DDD":
      case "DDDD":
        return "(\\d{1,3})";
      case "DDDo":
        index++;
        return "(\\d{1,3}(st|nd|rd|th))";
      case "w":
        return "(\\d{1,2})";
      case "wo":
        index++;
        return "(\\d{1,2}(st|nd|rd|th))";
      case "ww":
        return "(\\d{2})";
      case "Z":
        map.Z = index;
        return "(Z|[+-]\\d{2}:\\d{2})";
      case "ZZ":
        map.ZZ = index;
        return "(Z|[+-]\\d{2}\\d{2})";
      case "X":
        map.X = index;
        return "(-?\\d+)";
      case "x":
        map.x = index;
        return "(-?\\d{4,})";
      default:
        index--;
        if (match[0] === "[") {
          match = match.substring(1, match.length - 1);
        }
        return match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  });
  const res = { map, regex: new RegExp("^" + regexText) };
  regexStore[key] = res;
  return res;
}
function getDateLocale(paramDateLocale, langProps) {
  return paramDateLocale !== void 0 ? paramDateLocale : langProps !== void 0 ? langProps.date : defaultLang.date;
}
function formatTimezone(offset, delimeter = "") {
  const sign = offset > 0 ? "-" : "+", absOffset = Math.abs(offset), hours = Math.floor(absOffset / 60), minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes);
}
function applyYearMonthDayChange(date2, mod, sign) {
  let year = date2.getFullYear(), month = date2.getMonth();
  const day = date2.getDate();
  if (mod.year !== void 0) {
    year += sign * mod.year;
    delete mod.year;
  }
  if (mod.month !== void 0) {
    month += sign * mod.month;
    delete mod.month;
  }
  date2.setDate(1);
  date2.setMonth(2);
  date2.setFullYear(year);
  date2.setMonth(month);
  date2.setDate(Math.min(day, daysInMonth(date2)));
  if (mod.date !== void 0) {
    date2.setDate(date2.getDate() + sign * mod.date);
    delete mod.date;
  }
  return date2;
}
function applyYearMonthDay(date2, mod, middle) {
  const year = mod.year !== void 0 ? mod.year : date2[`get${middle}FullYear`](), month = mod.month !== void 0 ? mod.month - 1 : date2[`get${middle}Month`](), maxDay = new Date(year, month + 1, 0).getDate(), day = Math.min(maxDay, mod.date !== void 0 ? mod.date : date2[`get${middle}Date`]());
  date2[`set${middle}Date`](1);
  date2[`set${middle}Month`](2);
  date2[`set${middle}FullYear`](year);
  date2[`set${middle}Month`](month);
  date2[`set${middle}Date`](day);
  delete mod.year;
  delete mod.month;
  delete mod.date;
  return date2;
}
function getChange(date2, rawMod, sign) {
  const mod = normalizeMod(rawMod), d = new Date(date2), t = mod.year !== void 0 || mod.month !== void 0 || mod.date !== void 0 ? applyYearMonthDayChange(d, mod, sign) : d;
  for (const key in mod) {
    const op = capitalize(key);
    t[`set${op}`](t[`get${op}`]() + sign * mod[key]);
  }
  return t;
}
function normalizeMod(mod) {
  const acc = { ...mod };
  if (mod.years !== void 0) {
    acc.year = mod.years;
    delete acc.years;
  }
  if (mod.months !== void 0) {
    acc.month = mod.months;
    delete acc.months;
  }
  if (mod.days !== void 0) {
    acc.date = mod.days;
    delete acc.days;
  }
  if (mod.day !== void 0) {
    acc.date = mod.day;
    delete acc.day;
  }
  if (mod.hour !== void 0) {
    acc.hours = mod.hour;
    delete acc.hour;
  }
  if (mod.minute !== void 0) {
    acc.minutes = mod.minute;
    delete acc.minute;
  }
  if (mod.second !== void 0) {
    acc.seconds = mod.second;
    delete acc.second;
  }
  if (mod.millisecond !== void 0) {
    acc.milliseconds = mod.millisecond;
    delete acc.millisecond;
  }
  return acc;
}
function adjustDate(date2, rawMod, utc) {
  const mod = normalizeMod(rawMod), middle = utc === true ? "UTC" : "", d = new Date(date2), t = mod.year !== void 0 || mod.month !== void 0 || mod.date !== void 0 ? applyYearMonthDay(d, mod, middle) : d;
  for (const key in mod) {
    const op = key.charAt(0).toUpperCase() + key.slice(1);
    t[`set${middle}${op}`](mod[key]);
  }
  return t;
}
function extractDate(str, mask, dateLocale) {
  const d = __splitDate(str, mask, dateLocale);
  const date2 = new Date(
    d.year,
    d.month === null ? null : d.month - 1,
    d.day === null ? 1 : d.day,
    d.hour,
    d.minute,
    d.second,
    d.millisecond
  );
  const tzOffset = date2.getTimezoneOffset();
  return d.timezoneOffset === null || d.timezoneOffset === tzOffset ? date2 : getChange(date2, { minutes: d.timezoneOffset - tzOffset }, 1);
}
function __splitDate(str, mask, dateLocale, calendar, defaultModel) {
  const date2 = {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    second: null,
    millisecond: null,
    timezoneOffset: null,
    dateHash: null,
    timeHash: null
  };
  if (str === void 0 || str === null || str === "" || typeof str !== "string") {
    return date2;
  }
  if (mask === void 0) {
    mask = defaultMask;
  }
  const langOpts = getDateLocale(dateLocale, Plugin.props), months = langOpts.months, monthsShort = langOpts.monthsShort;
  const { regex, map } = getRegexData(mask, langOpts);
  const match = str.match(regex);
  if (match === null) {
    return date2;
  }
  let tzString = "";
  if (map.X !== void 0 || map.x !== void 0) {
    const stamp = parseInt(match[map.X !== void 0 ? map.X : map.x], 10);
    if (isNaN(stamp) === true || stamp < 0) {
      return date2;
    }
    const d = new Date(stamp * (map.X !== void 0 ? 1e3 : 1));
    date2.year = d.getFullYear();
    date2.month = d.getMonth() + 1;
    date2.day = d.getDate();
    date2.hour = d.getHours();
    date2.minute = d.getMinutes();
    date2.second = d.getSeconds();
    date2.millisecond = d.getMilliseconds();
  } else {
    if (map.YYYY !== void 0) {
      date2.year = parseInt(match[map.YYYY], 10);
    } else if (map.YY !== void 0) {
      const y = parseInt(match[map.YY], 10);
      date2.year = y < 0 ? y : 2e3 + y;
    }
    if (map.M !== void 0) {
      date2.month = parseInt(match[map.M], 10);
      if (date2.month < 1 || date2.month > 12) {
        return date2;
      }
    } else if (map.MMM !== void 0) {
      date2.month = monthsShort.indexOf(match[map.MMM]) + 1;
    } else if (map.MMMM !== void 0) {
      date2.month = months.indexOf(match[map.MMMM]) + 1;
    }
    if (map.D !== void 0) {
      date2.day = parseInt(match[map.D], 10);
      if (date2.year === null || date2.month === null || date2.day < 1) {
        return date2;
      }
      const maxDay = new Date(date2.year, date2.month, 0).getDate();
      if (date2.day > maxDay) {
        return date2;
      }
    }
    if (map.H !== void 0) {
      date2.hour = parseInt(match[map.H], 10) % 24;
    } else if (map.h !== void 0) {
      date2.hour = parseInt(match[map.h], 10) % 12;
      if (map.A && match[map.A] === "PM" || map.a && match[map.a] === "pm" || map.aa && match[map.aa] === "p.m.") {
        date2.hour += 12;
      }
      date2.hour = date2.hour % 24;
    }
    if (map.m !== void 0) {
      date2.minute = parseInt(match[map.m], 10) % 60;
    }
    if (map.s !== void 0) {
      date2.second = parseInt(match[map.s], 10) % 60;
    }
    if (map.S !== void 0) {
      date2.millisecond = parseInt(match[map.S], 10) * 10 ** (3 - match[map.S].length);
    }
    if (map.Z !== void 0 || map.ZZ !== void 0) {
      tzString = map.Z !== void 0 ? match[map.Z].replace(":", "") : match[map.ZZ];
      date2.timezoneOffset = (tzString[0] === "+" ? -1 : 1) * (60 * tzString.slice(1, 3) + 1 * tzString.slice(3, 5));
    }
  }
  date2.dateHash = pad(date2.year, 4) + "/" + pad(date2.month) + "/" + pad(date2.day);
  date2.timeHash = pad(date2.hour) + ":" + pad(date2.minute) + ":" + pad(date2.second) + tzString;
  return date2;
}
function isValid(date2) {
  return typeof date2 === "number" ? true : isNaN(Date.parse(date2)) === false;
}
function buildDate(mod, utc) {
  return adjustDate(/* @__PURE__ */ new Date(), mod, utc);
}
function getDayOfWeek(date2) {
  const dow = new Date(date2).getDay();
  return dow === 0 ? 7 : dow;
}
function getWeekOfYear(date2) {
  const thursday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  thursday.setDate(thursday.getDate() - (thursday.getDay() + 6) % 7 + 3);
  const firstThursday = new Date(thursday.getFullYear(), 0, 4);
  firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);
  const ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);
  const weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff);
}
function getDayIdentifier(date2) {
  return date2.getFullYear() * 1e4 + date2.getMonth() * 100 + date2.getDate();
}
function getDateIdentifier(date2, onlyDate) {
  const d = new Date(date2);
  return onlyDate === true ? getDayIdentifier(d) : d.getTime();
}
function isBetweenDates(date2, from, to, opts = {}) {
  const d1 = getDateIdentifier(from, opts.onlyDate), d2 = getDateIdentifier(to, opts.onlyDate), cur = getDateIdentifier(date2, opts.onlyDate);
  return (cur > d1 || opts.inclusiveFrom === true && cur === d1) && (cur < d2 || opts.inclusiveTo === true && cur === d2);
}
function addToDate(date2, mod) {
  return getChange(date2, mod, 1);
}
function subtractFromDate(date2, mod) {
  return getChange(date2, mod, -1);
}
function startOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](0);
    case "month":
    case "months":
      t[`${prefix}Date`](1);
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](0);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](0);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](0);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](0);
  }
  return t;
}
function endOfDate(date2, unit, utc) {
  const t = new Date(date2), prefix = `set${utc === true ? "UTC" : ""}`;
  switch (unit) {
    case "year":
    case "years":
      t[`${prefix}Month`](11);
    case "month":
    case "months":
      t[`${prefix}Date`](daysInMonth(t));
    case "day":
    case "days":
    case "date":
      t[`${prefix}Hours`](23);
    case "hour":
    case "hours":
      t[`${prefix}Minutes`](59);
    case "minute":
    case "minutes":
      t[`${prefix}Seconds`](59);
    case "second":
    case "seconds":
      t[`${prefix}Milliseconds`](999);
  }
  return t;
}
function getMaxDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.max(t, new Date(d));
  });
  return t;
}
function getMinDate(date2) {
  let t = new Date(date2);
  Array.prototype.slice.call(arguments, 1).forEach((d) => {
    t = Math.min(t, new Date(d));
  });
  return t;
}
function getDiff(t, sub, interval) {
  return (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE - (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)) / interval;
}
function getDateDiff(date2, subtract, unit = "days") {
  const t = new Date(date2), sub = new Date(subtract);
  switch (unit) {
    case "years":
    case "year":
      return t.getFullYear() - sub.getFullYear();
    case "months":
    case "month":
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth();
    case "days":
    case "day":
    case "date":
      return getDiff(startOfDate(t, "day"), startOfDate(sub, "day"), MILLISECONDS_IN_DAY);
    case "hours":
    case "hour":
      return getDiff(startOfDate(t, "hour"), startOfDate(sub, "hour"), MILLISECONDS_IN_HOUR);
    case "minutes":
    case "minute":
      return getDiff(startOfDate(t, "minute"), startOfDate(sub, "minute"), MILLISECONDS_IN_MINUTE);
    case "seconds":
    case "second":
      return getDiff(startOfDate(t, "second"), startOfDate(sub, "second"), 1e3);
  }
}
function getDayOfYear(date2) {
  return getDateDiff(date2, startOfDate(date2, "year"), "days") + 1;
}
function inferDateFormat(date2) {
  return isDate(date2) === true ? "date" : typeof date2 === "number" ? "number" : "string";
}
function getDateBetween(date2, min, max) {
  const t = new Date(date2);
  if (min) {
    const low = new Date(min);
    if (t < low) {
      return low;
    }
  }
  if (max) {
    const high = new Date(max);
    if (t > high) {
      return high;
    }
  }
  return t;
}
function isSameDate(date2, date22, unit) {
  const t = new Date(date2), d = new Date(date22);
  if (unit === void 0) {
    return t.getTime() === d.getTime();
  }
  switch (unit) {
    case "second":
    case "seconds":
      if (t.getSeconds() !== d.getSeconds()) {
        return false;
      }
    case "minute":
    // intentional fall-through
    case "minutes":
      if (t.getMinutes() !== d.getMinutes()) {
        return false;
      }
    case "hour":
    // intentional fall-through
    case "hours":
      if (t.getHours() !== d.getHours()) {
        return false;
      }
    case "day":
    // intentional fall-through
    case "days":
    case "date":
      if (t.getDate() !== d.getDate()) {
        return false;
      }
    case "month":
    // intentional fall-through
    case "months":
      if (t.getMonth() !== d.getMonth()) {
        return false;
      }
    case "year":
    // intentional fall-through
    case "years":
      if (t.getFullYear() !== d.getFullYear()) {
        return false;
      }
      break;
    default:
      throw new Error(`date isSameDate unknown unit ${unit}`);
  }
  return true;
}
function daysInMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
}
function getOrdinal(n) {
  if (n >= 11 && n <= 13) {
    return `${n}th`;
  }
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
  }
  return `${n}th`;
}
const formatter = {
  // Year: 00, 01, ..., 99
  YY(date2, dateLocale, forcedYear) {
    const y = this.YYYY(date2, dateLocale, forcedYear) % 100;
    return y >= 0 ? pad(y) : "-" + pad(Math.abs(y));
  },
  // Year: 1900, 1901, ..., 2099
  YYYY(date2, _dateLocale, forcedYear) {
    return forcedYear !== void 0 && forcedYear !== null ? forcedYear : date2.getFullYear();
  },
  // Month: 1, 2, ..., 12
  M(date2) {
    return date2.getMonth() + 1;
  },
  // Month: 1st, 2nd, ..., 12th
  Mo(date2) {
    return getOrdinal(date2.getMonth() + 1);
  },
  // Month: 01, 02, ..., 12
  MM(date2) {
    return pad(date2.getMonth() + 1);
  },
  // Month Short Name: Jan, Feb, ...
  MMM(date2, dateLocale) {
    return dateLocale.monthsShort[date2.getMonth()];
  },
  // Month Name: January, February, ...
  MMMM(date2, dateLocale) {
    return dateLocale.months[date2.getMonth()];
  },
  // Quarter: 1, 2, 3, 4
  Q(date2) {
    return Math.ceil((date2.getMonth() + 1) / 3);
  },
  // Quarter: 1st, 2nd, 3rd, 4th
  Qo(date2) {
    return getOrdinal(this.Q(date2));
  },
  // Day of month: 1, 2, ..., 31
  D(date2) {
    return date2.getDate();
  },
  // Day of month: 1st, 2nd, ..., 31st
  Do(date2) {
    return getOrdinal(date2.getDate());
  },
  // Day of month: 01, 02, ..., 31
  DD(date2) {
    return pad(date2.getDate());
  },
  // Day of year: 1, 2, ..., 366
  DDD(date2) {
    return getDayOfYear(date2);
  },
  // Day of year: 1st, 2nd, ..., 366th
  DDDo(date2) {
    return getOrdinal(getDayOfYear(date2));
  },
  // Day of year: 001, 002, ..., 366
  DDDD(date2) {
    return pad(getDayOfYear(date2), 3);
  },
  // Day of week: 0, 1, ..., 6
  d(date2) {
    return date2.getDay();
  },
  // Day of week: 0th, 1st, ..., 6th
  do(date2) {
    return getOrdinal(date2.getDay());
  },
  // Day of week: Su, Mo, ...
  dd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()].slice(0, 2);
  },
  // Day of week: Sun, Mon, ...
  ddd(date2, dateLocale) {
    return dateLocale.daysShort[date2.getDay()];
  },
  // Day of week: Sunday, Monday, ...
  dddd(date2, dateLocale) {
    return dateLocale.days[date2.getDay()];
  },
  // Day of ISO week: 1, 2, ..., 7
  E(date2) {
    return date2.getDay() || 7;
  },
  // Week of Year: 1 2 ... 52 53
  w(date2) {
    return getWeekOfYear(date2);
  },
  // Week of Year: 1st 2nd ... 52nd 53rd
  wo(date2) {
    return getOrdinal(getWeekOfYear(date2));
  },
  // Week of Year: 01 02 ... 52 53
  ww(date2) {
    return pad(getWeekOfYear(date2));
  },
  // Hour: 0, 1, ... 23
  H(date2) {
    return date2.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH(date2) {
    return pad(date2.getHours());
  },
  // Hour: 1, 2, ..., 12
  h(date2) {
    const hours = date2.getHours();
    return hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
  },
  // Hour: 01, 02, ..., 12
  hh(date2) {
    return pad(this.h(date2));
  },
  // Minute: 0, 1, ..., 59
  m(date2) {
    return date2.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm(date2) {
    return pad(date2.getMinutes());
  },
  // Second: 0, 1, ..., 59
  s(date2) {
    return date2.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss(date2) {
    return pad(date2.getSeconds());
  },
  // 1/10 of second: 0, 1, ..., 9
  S(date2) {
    return Math.floor(date2.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS(date2) {
    return pad(Math.floor(date2.getMilliseconds() / 10));
  },
  // Millisecond: 000, 001, ..., 999
  SSS(date2) {
    return pad(date2.getMilliseconds(), 3);
  },
  // Meridiem: AM, PM
  A(date2) {
    return date2.getHours() < 12 ? "AM" : "PM";
  },
  // Meridiem: am, pm
  a(date2) {
    return date2.getHours() < 12 ? "am" : "pm";
  },
  // Meridiem: a.m., p.m.
  aa(date2) {
    return date2.getHours() < 12 ? "a.m." : "p.m.";
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset, ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ(date2, _dateLocale, _forcedYear, forcedTimezoneOffset) {
    const tzOffset = forcedTimezoneOffset === void 0 || forcedTimezoneOffset === null ? date2.getTimezoneOffset() : forcedTimezoneOffset;
    return formatTimezone(tzOffset);
  },
  // Seconds timestamp: 512969520
  X(date2) {
    return Math.floor(date2.getTime() / 1e3);
  },
  // Milliseconds timestamp: 512969520900
  x(date2) {
    return date2.getTime();
  }
};
function formatDate$1(val, mask, dateLocale, __forcedYear, __forcedTimezoneOffset) {
  if (val !== 0 && !val || val === Infinity || val === -Infinity) return;
  const date2 = new Date(val);
  if (isNaN(date2)) return;
  if (mask === void 0) {
    mask = defaultMask;
  }
  const locale = getDateLocale(dateLocale, Plugin.props);
  return mask.replace(
    token,
    (match, text) => match in formatter ? formatter[match](date2, locale, __forcedYear, __forcedTimezoneOffset) : text === void 0 ? match : text.split("\\]").join("]")
  );
}
function clone(date2) {
  return isDate(date2) === true ? new Date(date2.getTime()) : date2;
}
const date = {
  isValid,
  extractDate,
  buildDate,
  getDayOfWeek,
  getWeekOfYear,
  isBetweenDates,
  addToDate,
  subtractFromDate,
  adjustDate,
  startOfDate,
  endOfDate,
  getMaxDate,
  getMinDate,
  getDateDiff,
  getDayOfYear,
  inferDateFormat,
  getDateBetween,
  isSameDate,
  daysInMonth,
  formatDate: formatDate$1,
  clone
};
function formatDate(isoDate) {
  return date.formatDate(Date.parse(isoDate), "DD.MM.YYYY HH:mm");
}
const STATE_ATTRIBUTES = {
  "NE": { id: "NE", color: "blue-5", icon: "content_paste" },
  "PE": { id: "PE", color: "orange-5", icon: "pending_actions" },
  "IP": { id: "IP", color: "blue-5", icon: "rowing" },
  "DO": { id: "DO", color: "green-5", icon: "task_alt" },
  "UN": { id: "UN", color: "grey-5", icon: "help_outline" }
};
const PRIORITY_ATTRIBUTES = {
  "A+": { id: "A+", color: "red-5" },
  "AA": { id: "AA", color: "orange-5" },
  "BB": { id: "BB", color: "green-5" },
  "CC": { id: "CC", color: "blue-5" },
  "C-": { id: "C-", color: "blue-5" },
  "UN": { id: "UN", color: "grey-5" }
};
function getStateAttributes(stateId) {
  return STATE_ATTRIBUTES[stateId] || STATE_ATTRIBUTES["UN"];
}
function getPriorityAttributes(priorityId) {
  return PRIORITY_ATTRIBUTES[priorityId] || PRIORITY_ATTRIBUTES["UN"];
}
function useOperationProgress() {
  const isRunning = ref(false);
  const isDone = computed(() => !isRunning.value);
  return {
    isRunning,
    isDone
  };
}
const ERROR_MESSAGES = {
  LOAD_ITEMS: "Error while loading todo items. Check the connection with the backend.",
  LOAD_ITEM: (id) => `Error while loading the todo item #${id}. Check the connection with the backend.`,
  DELETE_ITEM: (id) => `Error while deleting the todo item #${id}`,
  UPDATE_ITEM: (id) => `Error while updating the todo item #${id}`,
  CREATE_ITEM: "Error while creating a todo item"
};
const UI_MESSAGES = {
  SAVED: "Saved!",
  DELETED: "Deleted!",
  NO_TODO_ITEMS: "No todo items found"
};
const CONFIRM_MESSAGES = {
  DELETE_TODO_ITEM: (todoItemText) => `Would you like to delete the todo item?
"${todoItemText?.substring(0, 50) || ""}..."`
};
const HTTP_ERROR_MESSAGES = {
  400: "Missing/empty input data",
  401: "User is not authenticated",
  403: "User has no permission to execute",
  404: "Required resource was not found",
  500: "Internal server error",
  DEFAULT: "Unknown error"
};
const API_ENDPOINTS = {
  TODO_ITEMS: "todoitems",
  TODO_ITEM: (id) => `todoitems/${id}`
};
async function callApi(operation, errorContext) {
  try {
    const response = await operation();
    return createResult(response.data.result, null);
  } catch (error) {
    const errorMessage = handleError(error, errorContext);
    return createResult(null, errorMessage);
  }
}
async function getTodoItems() {
  return callApi(
    () => axiosInstance.get(API_ENDPOINTS.TODO_ITEMS),
    ERROR_MESSAGES.LOAD_ITEMS
  );
}
async function deleteTodoItemById(id) {
  return callApi(
    () => axiosInstance.delete(API_ENDPOINTS.TODO_ITEM(id)),
    ERROR_MESSAGES.DELETE_ITEM(id)
  );
}
async function getTodoItemById(id) {
  return callApi(
    () => axiosInstance.get(API_ENDPOINTS.TODO_ITEM(id)),
    ERROR_MESSAGES.LOAD_ITEM(id)
  );
}
async function updateTodoItem(todoItem) {
  return callApi(
    () => {
      return axiosInstance.put(API_ENDPOINTS.TODO_ITEM(todoItem.id), todoItem);
    },
    ERROR_MESSAGES.UPDATE_ITEM(todoItem.id)
  );
}
async function createTodoItem(todoItem) {
  return callApi(
    () => {
      return axiosInstance.post(API_ENDPOINTS.TODO_ITEMS, todoItem);
    },
    ERROR_MESSAGES.CREATE_ITEM
  );
}
function handleError(error, logErrorMessage) {
  console.error(logErrorMessage);
  let message;
  if (error.response) {
    console.error("HTTP code: ", error.response.status);
    console.error("Response data: ", error.response.data);
    message = "Error: " + (error.response.data.error ? error.response.data.error : getErrorMessageByHttpCode(error.response.status));
  } else if (error.request) {
    console.error("No response: ", error.request);
    message = logErrorMessage;
  } else {
    console.error("Invalid request: ", error.message);
    message = logErrorMessage;
  }
  console.error(error.config);
  return message;
}
function getErrorMessageByHttpCode(httpCode) {
  return HTTP_ERROR_MESSAGES[httpCode] || HTTP_ERROR_MESSAGES.DEFAULT;
}
function createResult(result, error) {
  return {
    result,
    error
  };
}
const QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
const QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
const ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value }) {
      const ctx = {
        depth: getDepth(value),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const proxy = getPortalProxy(el);
            if (proxy !== void 0) {
              closePortals(proxy, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value, oldValue }) {
      if (value !== oldValue) {
        el.__qclosepopup.depth = getDepth(value);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
const _sfc_main$1 = {
  __name: "ConfirmDialog",
  props: {
    icon: {
      type: String,
      default: "info"
    },
    message: {
      type: String,
      required: true
    },
    yesButtonCallback: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "col-3" };
const _hoisted_2 = { class: "col-9" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, null, {
    default: withCtx(() => [
      createVNode(QCardSection, { class: "row" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(QAvatar, {
              icon: $props.icon,
              color: "primary",
              "text-color": "white"
            }, null, 8, ["icon"])
          ]),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", null, toDisplayString($props.message), 1)
          ])
        ]),
        _: 1
      }),
      createVNode(QCardActions, { align: "right" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            flat: "",
            label: "No",
            color: "primary"
          }, null, 512), [
            [ClosePopup]
          ]),
          withDirectives(createVNode(QBtn, {
            flat: "",
            label: "Yes",
            color: "primary",
            onClick: $props.yesButtonCallback
          }, null, 8, ["onClick"]), [
            [ClosePopup]
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ConfirmDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ConfirmDialog.vue"]]);
function notify(hasError, successMessage, errorMessage) {
  Notify.create({
    message: hasError ? errorMessage : successMessage,
    timeout: hasError ? 0 : 2e3,
    icon: hasError ? "report_problem" : "info",
    color: hasError ? "orange-6" : "blue-6",
    actions: [{ icon: "close", color: "white" }]
  });
}
const _sfc_main = {
  __name: "Banner",
  props: {
    iconName: {
      type: String,
      default: "info"
    },
    iconColor: {
      type: String,
      default: "blue-10"
    },
    message: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String,
      required: false
    },
    buttonCallback: {
      type: Function,
      required: false
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBanner, { class: "bg-grey-3" }, {
    avatar: withCtx(() => [
      createVNode(QIcon, {
        name: $props.iconName,
        color: $props.iconColor
      }, null, 8, ["name", "color"])
    ]),
    action: withCtx(() => [
      $props.buttonLabel ? (openBlock(), createBlock(QBtn, {
        key: 0,
        color: "blue-10",
        label: $props.buttonLabel,
        "no-caps": "",
        onClick: $props.buttonCallback
      }, null, 8, ["label", "onClick"])) : createCommentVNode("", true)
    ]),
    default: withCtx(() => [
      createTextVNode(" " + toDisplayString($props.message) + " ", 1)
    ]),
    _: 1
  });
}
const Banner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Banner.vue"]]);
export {
  Banner as B,
  ConfirmDialog as C,
  QPageSticky as Q,
  UI_MESSAGES as U,
  getPriorityAttributes as a,
  getTodoItems as b,
  QDialog as c,
  deleteTodoItemById as d,
  CONFIRM_MESSAGES as e,
  formatDate as f,
  getStateAttributes as g,
  useTransitionProps as h,
  useTransition as i,
  getTodoItemById as j,
  createTodoItem as k,
  updateTodoItem as l,
  addFocusFn as m,
  notify as n,
  removeFocusFn as r,
  useOperationProgress as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFubmVyLWZ3cEw1dENWLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2Utc3RpY2t5L3VzZS1wYWdlLXN0aWNreS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcGFnZS1zdGlja3kvUVBhZ2VTdGlja3kuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQvZXNjYXBlLWtleS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXNvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2RpYWxvZy9RRGlhbG9nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZGF0ZS9kYXRlLmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL2Zvcm1hdHRlci5qcyIsIi4uLy4uLy4uL3NyYy91dGlscy9kaWN0aW9uYXJ5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL29wZXJhdGlvblByb2dyZXNzLmpzIiwiLi4vLi4vLi4vc3JjL2NvbnN0YW50cy9tZXNzYWdlcy5qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9kYXRhU2VydmljZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2FyZC9RQ2FyZFNlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmRBY3Rpb25zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jYXJkL1FDYXJkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9jbG9zZS1wb3B1cC9DbG9zZVBvcHVwLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29uZmlybURpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvdXRpbHMvbm90aWZ5LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQmFubmVyLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VQYWdlU3RpY2t5UHJvcHMgPSB7XG4gIHBvc2l0aW9uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdib3R0b20tcmlnaHQnLFxuICAgIHZhbGlkYXRvcjogdiA9PiBbXG4gICAgICAndG9wLXJpZ2h0JywgJ3RvcC1sZWZ0JyxcbiAgICAgICdib3R0b20tcmlnaHQnLCAnYm90dG9tLWxlZnQnLFxuICAgICAgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCdcbiAgICBdLmluY2x1ZGVzKHYpXG4gIH0sXG4gIG9mZnNldDoge1xuICAgIHR5cGU6IEFycmF5LFxuICAgIHZhbGlkYXRvcjogdiA9PiB2Lmxlbmd0aCA9PT0gMlxuICB9LFxuICBleHBhbmQ6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1FQYWdlU3RpY2t5IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gIH1cblxuICBjb25zdCBhdHRhY2ggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcG9zID0gcHJvcHMucG9zaXRpb25cblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHBvcy5pbmRleE9mKCd0b3AnKSAhPT0gLTEsXG4gICAgICByaWdodDogcG9zLmluZGV4T2YoJ3JpZ2h0JykgIT09IC0xLFxuICAgICAgYm90dG9tOiBwb3MuaW5kZXhPZignYm90dG9tJykgIT09IC0xLFxuICAgICAgbGVmdDogcG9zLmluZGV4T2YoJ2xlZnQnKSAhPT0gLTEsXG4gICAgICB2ZXJ0aWNhbDogcG9zID09PSAndG9wJyB8fCBwb3MgPT09ICdib3R0b20nLFxuICAgICAgaG9yaXpvbnRhbDogcG9zID09PSAnbGVmdCcgfHwgcG9zID09PSAncmlnaHQnXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHRvcCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQuaGVhZGVyLm9mZnNldClcbiAgY29uc3QgcmlnaHQgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LnJpZ2h0Lm9mZnNldClcbiAgY29uc3QgYm90dG9tID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5mb290ZXIub2Zmc2V0KVxuICBjb25zdCBsZWZ0ID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5sZWZ0Lm9mZnNldClcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgcG9zWCA9IDAsIHBvc1kgPSAwXG5cbiAgICBjb25zdCBzaWRlID0gYXR0YWNoLnZhbHVlXG4gICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcblxuICAgIGlmIChzaWRlLnRvcCA9PT0gdHJ1ZSAmJiB0b3AudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1kgPSBgJHsgdG9wLnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5ib3R0b20gPT09IHRydWUgJiYgYm90dG9tLnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NZID0gYCR7IC1ib3R0b20udmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLmxlZnQgPT09IHRydWUgJiYgbGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyBkaXIgKiBsZWZ0LnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5yaWdodCA9PT0gdHJ1ZSAmJiByaWdodC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyAtZGlyICogcmlnaHQudmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGNvbnN0IGNzcyA9IHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7IHBvc1ggfSwgJHsgcG9zWSB9KWAgfVxuXG4gICAgaWYgKHByb3BzLm9mZnNldCkge1xuICAgICAgY3NzLm1hcmdpbiA9IGAkeyBwcm9wcy5vZmZzZXRbIDEgXSB9cHggJHsgcHJvcHMub2Zmc2V0WyAwIF0gfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBpZiAobGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdID0gYCR7IGxlZnQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHJpZ2h0LnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF0gPSBgJHsgcmlnaHQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh0b3AudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzLnRvcCA9IGAkeyB0b3AudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbS52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3MuYm90dG9tID0gYCR7IGJvdHRvbS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLXBhZ2Utc3RpY2t5IHJvdyBmbGV4LWNlbnRlciBmaXhlZC0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICsgYCBxLXBhZ2Utc3RpY2t5LS0keyBwcm9wcy5leHBhbmQgPT09IHRydWUgPyAnZXhwYW5kJyA6ICdzaHJpbmsnIH1gXG4gIClcblxuICBmdW5jdGlvbiBnZXRTdGlja3lDb250ZW50IChzbG90cykge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSxcbiAgICBwcm9wcy5leHBhbmQgPT09IHRydWVcbiAgICAgID8gY29udGVudFxuICAgICAgOiBbIGgoJ2RpdicsIGNvbnRlbnQpIF1cbiAgICApXG4gIH1cblxuICByZXR1cm4ge1xuICAgICRsYXlvdXQsXG4gICAgZ2V0U3RpY2t5Q29udGVudFxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlUGFnZVN0aWNreSwgeyB1c2VQYWdlU3RpY2t5UHJvcHMgfSBmcm9tICcuL3VzZS1wYWdlLXN0aWNreS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlU3RpY2t5JyxcblxuICBwcm9wczogdXNlUGFnZVN0aWNreVByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGdldFN0aWNreUNvbnRlbnQgfSA9IHVzZVBhZ2VTdGlja3koKVxuICAgIHJldHVybiAoKSA9PiBnZXRTdGlja3lDb250ZW50KHNsb3RzKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgbmV4dFRpY2ssIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaWNrKGZuKVxuICogICAgcmVtb3ZlVGljaygpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaWNrICgpIHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGljaylcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpY2spXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaWNrLFxuXG4gICAgcmVnaXN0ZXJUaWNrIChmbikge1xuICAgICAgdGlja0ZuID0gZm5cblxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAodGlja0ZuID09PSBmbikge1xuICAgICAgICAgIC8vIHdlIGFsc28gY2hlY2sgaWYgVk0gaXMgZGVzdHJveWVkLCBzaW5jZSBpZiBpdFxuICAgICAgICAgIC8vIGdvdCB0byB0cmlnZ2VyIG9uZSBuZXh0VGljaygpIHdlIGNhbm5vdCBzdG9wIGl0XG4gICAgICAgICAgdm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlICYmIHRpY2tGbigpXG4gICAgICAgICAgdGlja0ZuID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVRyYW5zaXRpb25Qcm9wcyA9IHtcbiAgdHJhbnNpdGlvblNob3c6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2ZhZGUnXG4gIH0sXG5cbiAgdHJhbnNpdGlvbkhpZGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2ZhZGUnXG4gIH0sXG5cbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiB7XG4gICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIGRlZmF1bHQ6IDMwMFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZGVmYXVsdFNob3dGbiA9ICgpID0+IHt9LCBkZWZhdWx0SGlkZUZuID0gKCkgPT4ge30pIHtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2l0aW9uUHJvcHM6IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHNob3cgPSBgcS10cmFuc2l0aW9uLS0keyBwcm9wcy50cmFuc2l0aW9uU2hvdyB8fCBkZWZhdWx0U2hvd0ZuKCkgfWBcbiAgICAgIGNvbnN0IGhpZGUgPSBgcS10cmFuc2l0aW9uLS0keyBwcm9wcy50cmFuc2l0aW9uSGlkZSB8fCBkZWZhdWx0SGlkZUZuKCkgfWBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXBwZWFyOiB0cnVlLFxuXG4gICAgICAgIGVudGVyRnJvbUNsYXNzOiBgJHsgc2hvdyB9LWVudGVyLWZyb21gLFxuICAgICAgICBlbnRlckFjdGl2ZUNsYXNzOiBgJHsgc2hvdyB9LWVudGVyLWFjdGl2ZWAsXG4gICAgICAgIGVudGVyVG9DbGFzczogYCR7IHNob3cgfS1lbnRlci10b2AsXG5cbiAgICAgICAgbGVhdmVGcm9tQ2xhc3M6IGAkeyBoaWRlIH0tbGVhdmUtZnJvbWAsXG4gICAgICAgIGxlYXZlQWN0aXZlQ2xhc3M6IGAkeyBoaWRlIH0tbGVhdmUtYWN0aXZlYCxcbiAgICAgICAgbGVhdmVUb0NsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLXRvYFxuICAgICAgfVxuICAgIH0pLFxuXG4gICAgdHJhbnNpdGlvblN0eWxlOiBjb21wdXRlZCgoKSA9PiBgLS1xLXRyYW5zaXRpb24tZHVyYXRpb246ICR7IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiB9bXNgKVxuICB9XG59XG4iLCJsZXQgcXVldWUgPSBbXVxubGV0IHdhaXRGbGFncyA9IFtdXG5cbmZ1bmN0aW9uIGNsZWFyRmxhZyAoZmxhZykge1xuICB3YWl0RmxhZ3MgPSB3YWl0RmxhZ3MuZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBmbGFnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNXYWl0RmxhZyAoZmxhZykge1xuICBjbGVhckZsYWcoZmxhZylcbiAgd2FpdEZsYWdzLnB1c2goZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG5cbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDAgJiYgcXVldWUubGVuZ3RoICE9PSAwKSB7XG4gICAgLy8gb25seSBjYWxsIGxhc3QgZm9jdXMgaGFuZGxlciAoY2FuJ3QgZm9jdXMgbXVsdGlwbGUgdGhpbmdzIGF0IG9uY2UpXG4gICAgcXVldWVbIHF1ZXVlLmxlbmd0aCAtIDEgXSgpXG4gICAgcXVldWUgPSBbXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c0ZuIChmbikge1xuICBpZiAod2FpdEZsYWdzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZuKClcbiAgfVxuICBlbHNlIHtcbiAgICBxdWV1ZS5wdXNoKGZuKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c0ZuIChmbikge1xuICBxdWV1ZSA9IHF1ZXVlLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZm4pXG59XG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4uL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50Py4kb3B0aW9ucy5uYW1lID09PSAnUVBvcHVwUHJveHknKSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3h5XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfSB3aGlsZSAocHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFscyAocHJveHksIGV2dCwgZGVwdGgpIHtcbiAgd2hpbGUgKGRlcHRoICE9PSAwICYmIHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpIHtcbiAgICBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICBkZXB0aC0tXG5cbiAgICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICAgIHByb3h5ID0gY2xvc2VQb3J0YWxNZW51cyhwcm94eSwgZXZ0KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBwcm94eS5oaWRlKGV2dClcbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIG9uVW5tb3VudGVkLCBUZWxlcG9ydCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNXYWl0RmxhZywgcmVtb3ZlRm9jdXNXYWl0RmxhZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGNyZWF0ZUdsb2JhbE5vZGUsIHJlbW92ZUdsb2JhbE5vZGUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNvbmZpZy9ub2Rlcy5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbi8qKlxuICogTm9vcCBpbnRlcm5hbCBjb21wb25lbnQgdG8gZWFzZSB0ZXN0aW5nXG4gKiBvZiB0aGUgdGVsZXBvcnRlZCBjb250ZW50LlxuICpcbiAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudChRRGlhbG9nLCB7IC4uLiB9KVxuICogY29uc3QgdGVsZXBvcnRlZFdyYXBwZXIgPSB3cmFwcGVyLmZpbmRDb21wb25lbnQoeyBuYW1lOiAnUVBvcnRhbCcgfSlcbiAqL1xuY29uc3QgUVBvcnRhbCA9IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9ydGFsJyxcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBzbG90cy5kZWZhdWx0KClcbiAgfVxufSlcblxuZnVuY3Rpb24gaXNPbkdsb2JhbERpYWxvZyAodm0pIHtcbiAgdm0gPSB2bS5wYXJlbnRcblxuICB3aGlsZSAodm0gIT09IHZvaWQgMCAmJiB2bSAhPT0gbnVsbCkge1xuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRR2xvYmFsRGlhbG9nJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHZtLnR5cGUubmFtZSA9PT0gJ1FEaWFsb2cnIHx8IHZtLnR5cGUubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdm0gPSB2bS5wYXJlbnRcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBXYXJuaW5nIVxuLy8gWW91IE1VU1Qgc3BlY2lmeSBcImluaGVyaXRBdHRyczogZmFsc2VcIiBpbiB5b3VyIGNvbXBvbmVudFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCB0eXBlKSB7XG4gIC8vIHNob3dpbmcsIGluY2x1ZGluZyB3aGlsZSBpbiBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjdGl2ZSA9IHJlZihmYWxzZSlcblxuICAvLyBzaG93aW5nICYgbm90IGluIGFueSBzaG93L2hpZGUgdHJhbnNpdGlvblxuICBjb25zdCBwb3J0YWxJc0FjY2Vzc2libGUgPSByZWYoZmFsc2UpXG5cbiAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0YWxJc0FjdGl2ZSxcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgICAgc2hvd1BvcnRhbDogbm9vcCxcbiAgICAgIGhpZGVQb3J0YWw6IG5vb3AsXG4gICAgICByZW5kZXJQb3J0YWw6IG5vb3BcbiAgICB9XG4gIH1cblxuICBsZXQgcG9ydGFsRWwgPSBudWxsXG4gIGNvbnN0IGZvY3VzT2JqID0ge31cbiAgY29uc3Qgb25HbG9iYWxEaWFsb2cgPSB0eXBlID09PSAnZGlhbG9nJyAmJiBpc09uR2xvYmFsRGlhbG9nKHZtKVxuXG4gIGZ1bmN0aW9uIHNob3dQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBpZiAoaXNSZWFkeSA9PT0gdHJ1ZSkge1xuICAgICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAocG9ydGFsSXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpZiAob25HbG9iYWxEaWFsb2cgPT09IGZhbHNlICYmIHBvcnRhbEVsID09PSBudWxsKSB7XG4gICAgICAgIHBvcnRhbEVsID0gY3JlYXRlR2xvYmFsTm9kZShmYWxzZSwgdHlwZSlcbiAgICAgIH1cblxuICAgICAgcG9ydGFsSXNBY3RpdmUudmFsdWUgPSB0cnVlXG5cbiAgICAgIC8vIHJlZ2lzdGVyIHBvcnRhbFxuICAgICAgcG9ydGFsUHJveHlMaXN0LnB1c2godm0ucHJveHkpXG5cbiAgICAgIGFkZEZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBvcnRhbCAoaXNSZWFkeSkge1xuICAgIHBvcnRhbElzQWNjZXNzaWJsZS52YWx1ZSA9IGZhbHNlXG5cbiAgICBpZiAoaXNSZWFkeSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICByZW1vdmVGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gZmFsc2VcblxuICAgIC8vIHVucmVnaXN0ZXIgcG9ydGFsXG4gICAgY29uc3QgaW5kZXggPSBwb3J0YWxQcm94eUxpc3QuaW5kZXhPZih2bS5wcm94eSlcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBwb3J0YWxQcm94eUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cblxuICAgIGlmIChwb3J0YWxFbCAhPT0gbnVsbCkge1xuICAgICAgcmVtb3ZlR2xvYmFsTm9kZShwb3J0YWxFbClcbiAgICAgIHBvcnRhbEVsID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uVW5tb3VudGVkKCgpID0+IHsgaGlkZVBvcnRhbCh0cnVlKSB9KVxuXG4gIC8vIG5lZWRlZCBmb3IgcG9ydGFsIHZtIGRldGVjdGlvblxuICB2bS5wcm94eS5fX3FQb3J0YWwgPSB0cnVlXG5cbiAgLy8gcHVibGljIHdheSBvZiBhY2Nlc3NpbmcgdGhlIHJlbmRlcmVkIGNvbnRlbnRcbiAgaW5qZWN0UHJvcCh2bS5wcm94eSwgJ2NvbnRlbnRFbCcsICgpID0+IGlubmVyUmVmLnZhbHVlKVxuXG4gIHJldHVybiB7XG4gICAgc2hvd1BvcnRhbCxcbiAgICBoaWRlUG9ydGFsLFxuXG4gICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgcG9ydGFsSXNBY2Nlc3NpYmxlLFxuXG4gICAgcmVuZGVyUG9ydGFsOiAoKSA9PiAoXG4gICAgICBvbkdsb2JhbERpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IHJlbmRlclBvcnRhbENvbnRlbnQoKVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gWyBoKFRlbGVwb3J0LCB7IHRvOiBwb3J0YWxFbCB9LCBoKFFQb3J0YWwsIHJlbmRlclBvcnRhbENvbnRlbnQpKSBdXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5jb25zdCBoYW5kbGVycyA9IFtdXG5sZXQgZXNjRG93blxuXG5mdW5jdGlvbiBvbktleWRvd24gKGV2dCkge1xuICBlc2NEb3duID0gZXZ0LmtleUNvZGUgPT09IDI3XG59XG5cbmZ1bmN0aW9uIG9uQmx1ciAoKSB7XG4gIGlmIChlc2NEb3duID09PSB0cnVlKSB7XG4gICAgZXNjRG93biA9IGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gb25LZXl1cCAoZXZ0KSB7XG4gIGlmIChlc2NEb3duID09PSB0cnVlKSB7XG4gICAgZXNjRG93biA9IGZhbHNlXG5cbiAgICBpZiAoaXNLZXlDb2RlKGV2dCwgMjcpID09PSB0cnVlKSB7XG4gICAgICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGV2dClcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlIChhY3Rpb24pIHtcbiAgd2luZG93WyBhY3Rpb24gXSgna2V5ZG93bicsIG9uS2V5ZG93bilcbiAgd2luZG93WyBhY3Rpb24gXSgnYmx1cicsIG9uQmx1cilcbiAgd2luZG93WyBhY3Rpb24gXSgna2V5dXAnLCBvbktleXVwKVxuICBlc2NEb3duID0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEVzY2FwZUtleSAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHVwZGF0ZSgnYWRkRXZlbnRMaXN0ZW5lcicpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFc2NhcGVLZXkgKGZuKSB7XG4gIGNvbnN0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihmbilcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHVwZGF0ZSgncmVtb3ZlRXZlbnRMaXN0ZW5lcicpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBoYW5kbGVycyA9IFtdXG5cbmZ1bmN0aW9uIHRyaWdnZXIgKGUpIHtcbiAgaGFuZGxlcnNbIGhhbmRsZXJzLmxlbmd0aCAtIDEgXShlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNvdXQgKGZuKSB7XG4gIGlmIChjbGllbnQuaXMuZGVza3RvcCA9PT0gdHJ1ZSkge1xuICAgIGhhbmRsZXJzLnB1c2goZm4pXG5cbiAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0cmlnZ2VyKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNvdXQgKGZuKSB7XG4gIGNvbnN0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihmbilcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWhpc3RvcnkvdXNlLWhpc3RvcnkuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1tb2RlbC10b2dnbGUvdXNlLW1vZGVsLXRvZ2dsZS5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcHJldmVudC1zY3JvbGwvdXNlLXByZXZlbnQtc2Nyb2xsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjaGlsZEhhc0ZvY3VzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tL2RvbS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgYWRkRXNjYXBlS2V5LCByZW1vdmVFc2NhcGVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmtleWJvYXJkL2VzY2FwZS1rZXkuanMnXG5pbXBvcnQgeyBhZGRGb2N1c291dCwgcmVtb3ZlRm9jdXNvdXQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3Vzb3V0LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcblxubGV0IG1heGltaXplZE1vZGFscyA9IDBcblxuY29uc3QgcG9zaXRpb25DbGFzcyA9IHtcbiAgc3RhbmRhcmQ6ICdmaXhlZC1mdWxsIGZsZXgtY2VudGVyJyxcbiAgdG9wOiAnZml4ZWQtdG9wIGp1c3RpZnktY2VudGVyJyxcbiAgYm90dG9tOiAnZml4ZWQtYm90dG9tIGp1c3RpZnktY2VudGVyJyxcbiAgcmlnaHQ6ICdmaXhlZC1yaWdodCBpdGVtcy1jZW50ZXInLFxuICBsZWZ0OiAnZml4ZWQtbGVmdCBpdGVtcy1jZW50ZXInXG59XG5cbmNvbnN0IGRlZmF1bHRUcmFuc2l0aW9ucyA9IHtcbiAgc3RhbmRhcmQ6IFsgJ3NjYWxlJywgJ3NjYWxlJyBdLFxuICB0b3A6IFsgJ3NsaWRlLWRvd24nLCAnc2xpZGUtdXAnIF0sXG4gIGJvdHRvbTogWyAnc2xpZGUtdXAnLCAnc2xpZGUtZG93bicgXSxcbiAgcmlnaHQ6IFsgJ3NsaWRlLWxlZnQnLCAnc2xpZGUtcmlnaHQnIF0sXG4gIGxlZnQ6IFsgJ3NsaWRlLXJpZ2h0JywgJ3NsaWRlLWxlZnQnIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEaWFsb2cnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIHRyYW5zaXRpb25TaG93OiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuICAgIHRyYW5zaXRpb25IaWRlOiBTdHJpbmcsIC8vIG92ZXJyaWRlIHVzZVRyYW5zaXRpb25Qcm9wc1xuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhbixcbiAgICBhdXRvQ2xvc2U6IEJvb2xlYW4sXG4gICAgYWxsb3dGb2N1c091dHNpZGU6IEJvb2xlYW4sXG5cbiAgICBub0VzY0Rpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9CYWNrZHJvcERpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9Sb3V0ZURpc21pc3M6IEJvb2xlYW4sXG4gICAgbm9SZWZvY3VzOiBCb29sZWFuLFxuICAgIG5vRm9jdXM6IEJvb2xlYW4sXG4gICAgbm9TaGFrZTogQm9vbGVhbixcblxuICAgIHNlYW1sZXNzOiBCb29sZWFuLFxuXG4gICAgbWF4aW1pemVkOiBCb29sZWFuLFxuICAgIGZ1bGxXaWR0aDogQm9vbGVhbixcbiAgICBmdWxsSGVpZ2h0OiBCb29sZWFuLFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuXG4gICAgYmFja2Ryb3BGaWx0ZXI6IFN0cmluZyxcblxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gWyAnc3RhbmRhcmQnLCAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHZhbClcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdzaGFrZScsICdjbGljaycsICdlc2NhcGVLZXknXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGFuaW1hdGluZyA9IHJlZihmYWxzZSlcblxuICAgIGxldCBzaGFrZVRpbWVvdXQgPSBudWxsLCByZWZvY3VzVGFyZ2V0ID0gbnVsbCwgaXNNYXhpbWl6ZWQsIGF2b2lkQXV0b0Nsb3NlXG5cbiAgICBjb25zdCBoaWRlT25Sb3V0ZUNoYW5nZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ub1JvdXRlRGlzbWlzcyAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuc2VhbWxlc3MgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHByb3BzLFxuICAgICAgKCkgPT4gZGVmYXVsdFRyYW5zaXRpb25zWyBwcm9wcy5wb3NpdGlvbiBdWyAwIF0sXG4gICAgICAoKSA9PiBkZWZhdWx0VHJhbnNpdGlvbnNbIHByb3BzLnBvc2l0aW9uIF1bIDEgXVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICsgKFxuICAgICAgICBwcm9wcy5iYWNrZHJvcEZpbHRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgLy8gU2FmYXJpIHJlcXVpcmVzIHRoZSAtd2Via2l0IHByZWZpeFxuICAgICAgICAgID8gYDtiYWNrZHJvcC1maWx0ZXI6JHsgcHJvcHMuYmFja2Ryb3BGaWx0ZXIgfTstd2Via2l0LWJhY2tkcm9wLWZpbHRlcjokeyBwcm9wcy5iYWNrZHJvcEZpbHRlciB9YFxuICAgICAgICAgIDogJydcbiAgICAgIClcbiAgICApKVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCBwb3J0YWxJc0FjY2Vzc2libGUsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKFxuICAgICAgdm0sIGlubmVyUmVmLCByZW5kZXJQb3J0YWxDb250ZW50LCAnZGlhbG9nJ1xuICAgIClcblxuICAgIGNvbnN0IHsgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGUsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCB7IGFkZFRvSGlzdG9yeSwgcmVtb3ZlRnJvbUhpc3RvcnkgfSA9IHVzZUhpc3Rvcnkoc2hvd2luZywgaGlkZSwgaGlkZU9uUm91dGVDaGFuZ2UpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWRpYWxvZ19faW5uZXIgZmxleCBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLm1heGltaXplZCA9PT0gdHJ1ZSA/ICdtYXhpbWl6ZWQnIDogJ21pbmltaXplZCcgfWBcbiAgICAgICsgYCBxLWRpYWxvZ19faW5uZXItLSR7IHByb3BzLnBvc2l0aW9uIH0gJHsgcG9zaXRpb25DbGFzc1sgcHJvcHMucG9zaXRpb24gXSB9YFxuICAgICAgKyAoYW5pbWF0aW5nLnZhbHVlID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWFuaW1hdGluZycgOiAnJylcbiAgICAgICsgKHByb3BzLmZ1bGxXaWR0aCA9PT0gdHJ1ZSA/ICcgcS1kaWFsb2dfX2lubmVyLS1mdWxsd2lkdGgnIDogJycpXG4gICAgICArIChwcm9wcy5mdWxsSGVpZ2h0ID09PSB0cnVlID8gJyBxLWRpYWxvZ19faW5uZXItLWZ1bGxoZWlnaHQnIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZGlhbG9nX19pbm5lci0tc3F1YXJlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHVzZUJhY2tkcm9wID0gY29tcHV0ZWQoKCkgPT4gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5zZWFtbGVzcyAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IG9uRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuYXV0b0Nsb3NlID09PSB0cnVlXG4gICAgICAgID8geyBvbkNsaWNrOiBvbkF1dG9DbG9zZSB9XG4gICAgICAgIDoge31cbiAgICApKVxuXG4gICAgY29uc3Qgcm9vdENsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiBbXG4gICAgICAncS1kaWFsb2cgZnVsbHNjcmVlbiBuby1wb2ludGVyLWV2ZW50cyAnXG4gICAgICAgICsgYHEtZGlhbG9nLS0keyB1c2VCYWNrZHJvcC52YWx1ZSA9PT0gdHJ1ZSA/ICdtb2RhbCcgOiAnc2VhbWxlc3MnIH1gLFxuICAgICAgYXR0cnMuY2xhc3NcbiAgICBdKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubWF4aW1pemVkLCBzdGF0ZSA9PiB7XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1heGltaXplZChzdGF0ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2godXNlQmFja2Ryb3AsIHZhbCA9PiB7XG4gICAgICBwcmV2ZW50Qm9keVNjcm9sbCh2YWwpXG5cbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgYWRkRm9jdXNvdXQob25Gb2N1c0NoYW5nZSlcbiAgICAgICAgYWRkRXNjYXBlS2V5KG9uRXNjYXBlS2V5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUZvY3Vzb3V0KG9uRm9jdXNDaGFuZ2UpXG4gICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICByZWZvY3VzVGFyZ2V0ID0gcHJvcHMubm9SZWZvY3VzID09PSBmYWxzZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBudWxsXG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IG51bGxcblxuICAgICAgdXBkYXRlTWF4aW1pemVkKHByb3BzLm1heGltaXplZClcbiAgICAgIHNob3dQb3J0YWwoKVxuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBpZiAocHJvcHMubm9Gb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5ibHVyKClcbiAgICAgICAgcmVnaXN0ZXJUaWNrKGZvY3VzKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodm0ucHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHsgdG9wLCBib3R0b20gfSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICAgIHsgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdyxcbiAgICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IHdpbmRvdy52aXN1YWxWaWV3cG9ydC5oZWlnaHRcbiAgICAgICAgICAgICAgICA6IGlubmVySGVpZ2h0XG5cbiAgICAgICAgICAgIGlmICh0b3AgPiAwICYmIGJvdHRvbSA+IGhlaWdodCAvIDIpIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbEhlaWdodCAtIGhlaWdodCxcbiAgICAgICAgICAgICAgICBib3R0b20gPj0gaW5uZXJIZWlnaHRcbiAgICAgICAgICAgICAgICAgID8gSW5maW5pdHlcbiAgICAgICAgICAgICAgICAgIDogTWF0aC5jZWlsKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wICsgYm90dG9tIC0gaGVpZ2h0IC8gMilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXF1aXJlZCBpbiBvcmRlciB0byBhdm9pZCB0aGUgXCJkb3VibGUtdGFwIG5lZWRlZFwiIGlzc3VlXG4gICAgICAgICAgYXZvaWRBdXRvQ2xvc2UgPSB0cnVlXG4gICAgICAgICAgaW5uZXJSZWYudmFsdWUuY2xpY2soKVxuICAgICAgICAgIGF2b2lkQXV0b0Nsb3NlID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICByZW1vdmVGcm9tSGlzdG9yeSgpXG4gICAgICBjbGVhbnVwKHRydWUpXG4gICAgICBhbmltYXRpbmcudmFsdWUgPSB0cnVlXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgaWYgKHJlZm9jdXNUYXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgKChldnQ/LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDBcbiAgICAgICAgICA/IHJlZm9jdXNUYXJnZXQuY2xvc2VzdCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJylcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApIHx8IHJlZm9jdXNUYXJnZXQpLmZvY3VzKClcblxuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzIChzZWxlY3Rvcikge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICAgICAgaWYgKHRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgICAgICBub2RlID0gKFxuICAgICAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10gW3RhYmluZGV4XSwgW2RhdGEtYXV0b2ZvY3VzXSBbdGFiaW5kZXhdJylcbiAgICAgICAgICAgIHx8IG5vZGUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgICAgfHwgbm9kZVxuICAgICAgICAgIClcblxuICAgICAgICAgIG5vZGUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hha2UgKGZvY3VzVGFyZ2V0KSB7XG4gICAgICBpZiAoZm9jdXNUYXJnZXQgJiYgdHlwZW9mIGZvY3VzVGFyZ2V0LmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvY3VzVGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvY3VzKClcbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2hha2UnKVxuXG4gICAgICBjb25zdCBub2RlID0gaW5uZXJSZWYudmFsdWVcblxuICAgICAgaWYgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdxLWFuaW1hdGUtLXNjYWxlJylcbiAgICAgICAgc2hha2VUaW1lb3V0ICE9PSBudWxsICYmIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgICAgICBpZiAoaW5uZXJSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1hbmltYXRlLS1zY2FsZScpXG4gICAgICAgICAgICAvLyBzb21lIHBsYXRmb3JtcyAobGlrZSBkZXNrdG9wIENocm9tZSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmUgY2FsbGluZyBmb2N1cygpIGFnYWluXG4gICAgICAgICAgICBmb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAxNzApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Fc2NhcGVLZXkgKCkge1xuICAgICAgaWYgKHByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ID09PSB0cnVlIHx8IHByb3BzLm5vRXNjRGlzbWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByb3BzLm1heGltaXplZCAhPT0gdHJ1ZSAmJiBwcm9wcy5ub1NoYWtlICE9PSB0cnVlICYmIHNoYWtlKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBlbWl0KCdlc2NhcGVLZXknKVxuICAgICAgICAgIGhpZGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoaGlkaW5nKSB7XG4gICAgICBpZiAoc2hha2VUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzaGFrZVRpbWVvdXQpXG4gICAgICAgIHNoYWtlVGltZW91dCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZGluZyA9PT0gdHJ1ZSB8fCBzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZU1heGltaXplZChmYWxzZSlcblxuICAgICAgICBpZiAocHJvcHMuc2VhbWxlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICBwcmV2ZW50Qm9keVNjcm9sbChmYWxzZSlcbiAgICAgICAgICByZW1vdmVGb2N1c291dChvbkZvY3VzQ2hhbmdlKVxuICAgICAgICAgIHJlbW92ZUVzY2FwZUtleShvbkVzY2FwZUtleSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaGlkaW5nICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZm9jdXNUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWF4aW1pemVkIChhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlzTWF4aW1pemVkICE9PSB0cnVlKSB7XG4gICAgICAgICAgbWF4aW1pemVkTW9kYWxzIDwgMSAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZGlhbG9nJylcbiAgICAgICAgICBtYXhpbWl6ZWRNb2RhbHMrK1xuXG4gICAgICAgICAgaXNNYXhpbWl6ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzTWF4aW1pemVkID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChtYXhpbWl6ZWRNb2RhbHMgPCAyKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWRpYWxvZycpXG4gICAgICAgIH1cblxuICAgICAgICBtYXhpbWl6ZWRNb2RhbHMtLVxuICAgICAgICBpc01heGltaXplZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25BdXRvQ2xvc2UgKGUpIHtcbiAgICAgIGlmIChhdm9pZEF1dG9DbG9zZSAhPT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKGUpXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJhY2tkcm9wQ2xpY2sgKGUpIHtcbiAgICAgIGlmIChwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlICYmIHByb3BzLm5vQmFja2Ryb3BEaXNtaXNzICE9PSB0cnVlKSB7XG4gICAgICAgIGhpZGUoZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLm5vU2hha2UgIT09IHRydWUpIHtcbiAgICAgICAgc2hha2UoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNDaGFuZ2UgKGV2dCkge1xuICAgICAgLy8gdGhlIGZvY3VzIGlzIG5vdCBpbiBhIHZ1ZSBjaGlsZCBjb21wb25lbnRcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMuYWxsb3dGb2N1c091dHNpZGUgIT09IHRydWVcbiAgICAgICAgJiYgcG9ydGFsSXNBY2Nlc3NpYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICYmIGNoaWxkSGFzRm9jdXMoaW5uZXJSZWYudmFsdWUsIGV2dC50YXJnZXQpICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgZm9jdXMoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKScpXG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgICBmb2N1cywgc2hha2UsXG5cbiAgICAgIC8vIHByaXZhdGUgYnV0IG5lZWRlZCBieSBRU2VsZWN0XG4gICAgICBfX3VwZGF0ZVJlZm9jdXNUYXJnZXQgKHRhcmdldCkge1xuICAgICAgICByZWZvY3VzVGFyZ2V0ID0gdGFyZ2V0IHx8IG51bGxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0YWxDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJvbGU6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1tb2RhbCc6IHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGNsYXNzOiByb290Q2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoKFRyYW5zaXRpb24sIHtcbiAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS1mYWRlJyxcbiAgICAgICAgICBhcHBlYXI6IHRydWVcbiAgICAgICAgfSwgKCkgPT4gKFxuICAgICAgICAgIHVzZUJhY2tkcm9wLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWRpYWxvZ19fYmFja2Ryb3AgZml4ZWQtZnVsbCcsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAgICAgb25DbGljazogb25CYWNrZHJvcENsaWNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICkpLFxuXG4gICAgICAgIGgoXG4gICAgICAgICAgVHJhbnNpdGlvbixcbiAgICAgICAgICB0cmFuc2l0aW9uUHJvcHMudmFsdWUsXG4gICAgICAgICAgKCkgPT4gKFxuICAgICAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIiwiLyogZXNsaW50IG5vLWZhbGx0aHJvdWdoOiAwICovXG5cbmltcG9ydCB7IGlzRGF0ZSB9IGZyb20gJy4uL2lzL2lzLmpzJ1xuaW1wb3J0IHsgcGFkLCBjYXBpdGFsaXplIH0gZnJvbSAnLi4vZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGphbGFhbGlNb250aExlbmd0aCB9IGZyb20gJy4vcHJpdmF0ZS5wZXJzaWFuLmpzJ1xuaW1wb3J0IExhbmcsIHsgZGVmYXVsdExhbmcgfSBmcm9tICcuLi8uLi9wbHVnaW5zL2xhbmcvTGFuZy5qcydcblxuY29uc3RcbiAgTUlMTElTRUNPTkRTX0lOX0RBWSA9IDg2NDAwMDAwLFxuICBNSUxMSVNFQ09ORFNfSU5fSE9VUiA9IDM2MDAwMDAsXG4gIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMCxcbiAgZGVmYXVsdE1hc2sgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJyxcbiAgdG9rZW4gPSAvXFxbKCg/OlteXFxdXFxcXF18XFxcXF18XFxcXCkqKVxcXXxkb3xkezEsNH18TW98TXsxLDR9fG17MSwyfXx3b3x3ezEsMn18UW98RG98REREb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF0vZyxcbiAgcmV2ZXJzZVRva2VuID0gLyhcXFtbXlxcXV0qXFxdKXxkb3xkezEsNH18TW98TXsxLDR9fG17MSwyfXx3b3x3ezEsMn18UW98RG98REREb3xEezEsNH18WVkoPzpZWSk/fEh7MSwyfXxoezEsMn18c3sxLDJ9fFN7MSwzfXxaezEsMn18YXsxLDJ9fFtBUUV4WF18KFsuKis6P14sXFxzJHt9KCl8XFxcXF0rKS9nLFxuICByZWdleFN0b3JlID0ge31cblxuZnVuY3Rpb24gZ2V0UmVnZXhEYXRhIChtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0XG4gICAgZGF5cyA9ICcoJyArIGRhdGVMb2NhbGUuZGF5cy5qb2luKCd8JykgKyAnKScsXG4gICAga2V5ID0gbWFzayArIGRheXNcblxuICBpZiAocmVnZXhTdG9yZVsga2V5IF0gIT09IHZvaWQgMCkge1xuICAgIHJldHVybiByZWdleFN0b3JlWyBrZXkgXVxuICB9XG5cbiAgY29uc3RcbiAgICBkYXlzU2hvcnQgPSAnKCcgKyBkYXRlTG9jYWxlLmRheXNTaG9ydC5qb2luKCd8JykgKyAnKScsXG4gICAgbW9udGhzID0gJygnICsgZGF0ZUxvY2FsZS5tb250aHMuam9pbignfCcpICsgJyknLFxuICAgIG1vbnRoc1Nob3J0ID0gJygnICsgZGF0ZUxvY2FsZS5tb250aHNTaG9ydC5qb2luKCd8JykgKyAnKSdcblxuICBjb25zdCBtYXAgPSB7fVxuICBsZXQgaW5kZXggPSAwXG5cbiAgY29uc3QgcmVnZXhUZXh0ID0gbWFzay5yZXBsYWNlKHJldmVyc2VUb2tlbiwgbWF0Y2ggPT4ge1xuICAgIGluZGV4KytcbiAgICBzd2l0Y2ggKG1hdGNoKSB7XG4gICAgICBjYXNlICdZWSc6XG4gICAgICAgIG1hcC5ZWSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKC0/XFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgbWFwLllZWVkgPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezEsNH0pJ1xuICAgICAgY2FzZSAnTSc6XG4gICAgICAgIG1hcC5NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdNbyc6XG4gICAgICAgIG1hcC5NID0gaW5kZXgrKyAvLyBidW1waW5nIHRvIE1cbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnTU0nOlxuICAgICAgICBtYXAuTSA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gTVxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdNTU0nOlxuICAgICAgICBtYXAuTU1NID0gaW5kZXhcbiAgICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0XG4gICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgbWFwLk1NTU0gPSBpbmRleFxuICAgICAgICByZXR1cm4gbW9udGhzXG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ0RvJzpcbiAgICAgICAgbWFwLkQgPSBpbmRleCsrIC8vIGJ1bXBpbmcgdG8gRFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICdERCc6XG4gICAgICAgIG1hcC5EID0gaW5kZXggLy8gYnVtcGluZyB0byBEXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICBtYXAuSCA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBtYXAuSCA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gSFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDJ9KSdcbiAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgbWFwLmggPSBpbmRleCAvLyBidW1waW5nIHRvIGhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7Mn0pJ1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICdtbSc6XG4gICAgICAgIG1hcC5tID0gaW5kZXggLy8gYnVtcGluZyB0byBtXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFxcXFxkezEsMn0pJ1xuICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBtYXAucyA9IGluZGV4IC8vIGJ1bXBpbmcgdG8gc1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgbWFwLlMgPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezJ9KSdcbiAgICAgIGNhc2UgJ1NTUyc6XG4gICAgICAgIG1hcC5TID0gaW5kZXggLy8gYnVtcCB0byBTXG4gICAgICAgIHJldHVybiAnKFxcXFxkezN9KSdcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBtYXAuQSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKEFNfFBNKSdcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBtYXAuYSA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKGFtfHBtKSdcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgbWFwLmFhID0gaW5kZXhcbiAgICAgICAgcmV0dXJuICcoYVxcXFwubVxcXFwufHBcXFxcLm1cXFxcLiknXG5cbiAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIHJldHVybiBkYXlzU2hvcnRcbiAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICByZXR1cm4gZGF5c1xuICAgICAgY2FzZSAnUSc6XG4gICAgICBjYXNlICdkJzpcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsxfSknXG4gICAgICBjYXNlICdkbyc6XG4gICAgICAgIGluZGV4KytcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MX0oc3R8bmR8cmR8dGgpKSdcbiAgICAgIGNhc2UgJ1FvJzpcbiAgICAgICAgcmV0dXJuICcoMXN0fDJuZHwzcmR8NHRoKSdcbiAgICAgIGNhc2UgJ0RERCc6XG4gICAgICBjYXNlICdEREREJzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwzfSknXG4gICAgICBjYXNlICdERERvJzpcbiAgICAgICAgaW5kZXgrK1xuICAgICAgICByZXR1cm4gJyhcXFxcZHsxLDN9KHN0fG5kfHJkfHRoKSknXG4gICAgICBjYXNlICd3JzpcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfSknXG4gICAgICBjYXNlICd3byc6XG4gICAgICAgIGluZGV4KytcbiAgICAgICAgcmV0dXJuICcoXFxcXGR7MSwyfShzdHxuZHxyZHx0aCkpJ1xuICAgICAgY2FzZSAnd3cnOlxuICAgICAgICByZXR1cm4gJyhcXFxcZHsyfSknXG5cbiAgICAgIGNhc2UgJ1onOiAvLyB0byBzcGxpdDogKD86KFopKCkoKXwoWystXSk/KFxcXFxkezJ9KTo/KFxcXFxkezJ9KSlcbiAgICAgICAgbWFwLlogPSBpbmRleFxuICAgICAgICByZXR1cm4gJyhafFsrLV1cXFxcZHsyfTpcXFxcZHsyfSknXG4gICAgICBjYXNlICdaWic6XG4gICAgICAgIG1hcC5aWiA9IGluZGV4XG4gICAgICAgIHJldHVybiAnKFp8WystXVxcXFxkezJ9XFxcXGR7Mn0pJ1xuXG4gICAgICBjYXNlICdYJzpcbiAgICAgICAgbWFwLlggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkKyknXG4gICAgICBjYXNlICd4JzpcbiAgICAgICAgbWFwLnggPSBpbmRleFxuICAgICAgICByZXR1cm4gJygtP1xcXFxkezQsfSknXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGluZGV4LS1cbiAgICAgICAgaWYgKG1hdGNoWyAwIF0gPT09ICdbJykge1xuICAgICAgICAgIG1hdGNoID0gbWF0Y2guc3Vic3RyaW5nKDEsIG1hdGNoLmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgcmVzID0geyBtYXAsIHJlZ2V4OiBuZXcgUmVnRXhwKCdeJyArIHJlZ2V4VGV4dCkgfVxuICByZWdleFN0b3JlWyBrZXkgXSA9IHJlc1xuXG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZUxvY2FsZSAocGFyYW1EYXRlTG9jYWxlLCBsYW5nUHJvcHMpIHtcbiAgcmV0dXJuIHBhcmFtRGF0ZUxvY2FsZSAhPT0gdm9pZCAwXG4gICAgPyBwYXJhbURhdGVMb2NhbGVcbiAgICA6IChcbiAgICAgICAgbGFuZ1Byb3BzICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGxhbmdQcm9wcy5kYXRlXG4gICAgICAgICAgOiBkZWZhdWx0TGFuZy5kYXRlXG4gICAgICApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlciA9ICcnKSB7XG4gIGNvbnN0XG4gICAgc2lnbiA9IG9mZnNldCA+IDAgPyAnLScgOiAnKycsXG4gICAgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KSxcbiAgICBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApLFxuICAgIG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MFxuXG4gIHJldHVybiBzaWduICsgcGFkKGhvdXJzKSArIGRlbGltZXRlciArIHBhZChtaW51dGVzKVxufVxuXG5mdW5jdGlvbiBhcHBseVllYXJNb250aERheUNoYW5nZSAoZGF0ZSwgbW9kLCBzaWduKSB7XG4gIGxldFxuICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgbW9udGggPSBkYXRlLmdldE1vbnRoKClcblxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKVxuXG4gIGlmIChtb2QueWVhciAhPT0gdm9pZCAwKSB7XG4gICAgeWVhciArPSBzaWduICogbW9kLnllYXJcbiAgICBkZWxldGUgbW9kLnllYXJcbiAgfVxuXG4gIGlmIChtb2QubW9udGggIT09IHZvaWQgMCkge1xuICAgIG1vbnRoICs9IHNpZ24gKiBtb2QubW9udGhcbiAgICBkZWxldGUgbW9kLm1vbnRoXG4gIH1cblxuICBkYXRlLnNldERhdGUoMSlcbiAgZGF0ZS5zZXRNb250aCgyKVxuXG4gIGRhdGUuc2V0RnVsbFllYXIoeWVhcilcbiAgZGF0ZS5zZXRNb250aChtb250aClcbiAgZGF0ZS5zZXREYXRlKE1hdGgubWluKGRheSwgZGF5c0luTW9udGgoZGF0ZSkpKVxuXG4gIGlmIChtb2QuZGF0ZSAhPT0gdm9pZCAwKSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgc2lnbiAqIG1vZC5kYXRlKVxuICAgIGRlbGV0ZSBtb2QuZGF0ZVxuICB9XG5cbiAgcmV0dXJuIGRhdGVcbn1cblxuZnVuY3Rpb24gYXBwbHlZZWFyTW9udGhEYXkgKGRhdGUsIG1vZCwgbWlkZGxlKSB7XG4gIGNvbnN0XG4gICAgeWVhciA9IG1vZC55ZWFyICE9PSB2b2lkIDAgPyBtb2QueWVhciA6IGRhdGVbIGBnZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKCksXG4gICAgbW9udGggPSBtb2QubW9udGggIT09IHZvaWQgMCA/IG1vZC5tb250aCAtIDEgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1Nb250aGAgXSgpLFxuICAgIG1heERheSA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIDApKS5nZXREYXRlKCksXG4gICAgZGF5ID0gTWF0aC5taW4obWF4RGF5LCBtb2QuZGF0ZSAhPT0gdm9pZCAwID8gbW9kLmRhdGUgOiBkYXRlWyBgZ2V0JHsgbWlkZGxlIH1EYXRlYCBdKCkpXG5cbiAgZGF0ZVsgYHNldCR7IG1pZGRsZSB9RGF0ZWAgXSgxKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1Nb250aGAgXSgyKVxuXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfUZ1bGxZZWFyYCBdKHllYXIpXG4gIGRhdGVbIGBzZXQkeyBtaWRkbGUgfU1vbnRoYCBdKG1vbnRoKVxuICBkYXRlWyBgc2V0JHsgbWlkZGxlIH1EYXRlYCBdKGRheSlcblxuICBkZWxldGUgbW9kLnllYXJcbiAgZGVsZXRlIG1vZC5tb250aFxuICBkZWxldGUgbW9kLmRhdGVcblxuICByZXR1cm4gZGF0ZVxufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2UgKGRhdGUsIHJhd01vZCwgc2lnbikge1xuICBjb25zdFxuICAgIG1vZCA9IG5vcm1hbGl6ZU1vZChyYXdNb2QpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5Q2hhbmdlKGQsIG1vZCwgc2lnbikgLy8gcmVtb3ZlcyB5ZWFyL21vbnRoL2RheVxuICAgICAgOiBkXG5cbiAgZm9yIChjb25zdCBrZXkgaW4gbW9kKSB7XG4gICAgY29uc3Qgb3AgPSBjYXBpdGFsaXplKGtleSlcbiAgICB0WyBgc2V0JHsgb3AgfWAgXSh0WyBgZ2V0JHsgb3AgfWAgXSgpICsgc2lnbiAqIG1vZFsga2V5IF0pXG4gIH1cblxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVNb2QgKG1vZCkge1xuICBjb25zdCBhY2MgPSB7IC4uLm1vZCB9XG5cbiAgaWYgKG1vZC55ZWFycyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLnllYXIgPSBtb2QueWVhcnNcbiAgICBkZWxldGUgYWNjLnllYXJzXG4gIH1cblxuICBpZiAobW9kLm1vbnRocyAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLm1vbnRoID0gbW9kLm1vbnRoc1xuICAgIGRlbGV0ZSBhY2MubW9udGhzXG4gIH1cblxuICBpZiAobW9kLmRheXMgIT09IHZvaWQgMCkge1xuICAgIGFjYy5kYXRlID0gbW9kLmRheXNcbiAgICBkZWxldGUgYWNjLmRheXNcbiAgfVxuICBpZiAobW9kLmRheSAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmRhdGUgPSBtb2QuZGF5XG4gICAgZGVsZXRlIGFjYy5kYXlcbiAgfVxuXG4gIGlmIChtb2QuaG91ciAhPT0gdm9pZCAwKSB7XG4gICAgYWNjLmhvdXJzID0gbW9kLmhvdXJcbiAgICBkZWxldGUgYWNjLmhvdXJcbiAgfVxuXG4gIGlmIChtb2QubWludXRlICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWludXRlcyA9IG1vZC5taW51dGVcbiAgICBkZWxldGUgYWNjLm1pbnV0ZVxuICB9XG5cbiAgaWYgKG1vZC5zZWNvbmQgIT09IHZvaWQgMCkge1xuICAgIGFjYy5zZWNvbmRzID0gbW9kLnNlY29uZFxuICAgIGRlbGV0ZSBhY2Muc2Vjb25kXG4gIH1cblxuICBpZiAobW9kLm1pbGxpc2Vjb25kICE9PSB2b2lkIDApIHtcbiAgICBhY2MubWlsbGlzZWNvbmRzID0gbW9kLm1pbGxpc2Vjb25kXG4gICAgZGVsZXRlIGFjYy5taWxsaXNlY29uZFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0RGF0ZSAoZGF0ZSwgcmF3TW9kLCB1dGMpIHtcbiAgY29uc3RcbiAgICBtb2QgPSBub3JtYWxpemVNb2QocmF3TW9kKSxcbiAgICBtaWRkbGUgPSB1dGMgPT09IHRydWUgPyAnVVRDJyA6ICcnLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICB0ID0gbW9kLnllYXIgIT09IHZvaWQgMCB8fCBtb2QubW9udGggIT09IHZvaWQgMCB8fCBtb2QuZGF0ZSAhPT0gdm9pZCAwXG4gICAgICA/IGFwcGx5WWVhck1vbnRoRGF5KGQsIG1vZCwgbWlkZGxlKSAvLyByZW1vdmVzIHllYXIvbW9udGgvZGF5XG4gICAgICA6IGRcblxuICBmb3IgKGNvbnN0IGtleSBpbiBtb2QpIHtcbiAgICBjb25zdCBvcCA9IGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKVxuICAgIHRbIGBzZXQkeyBtaWRkbGUgfSR7IG9wIH1gIF0obW9kWyBrZXkgXSlcbiAgfVxuXG4gIHJldHVybiB0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGF0ZSAoc3RyLCBtYXNrLCBkYXRlTG9jYWxlKSB7XG4gIGNvbnN0IGQgPSBfX3NwbGl0RGF0ZShzdHIsIG1hc2ssIGRhdGVMb2NhbGUpXG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKFxuICAgIGQueWVhcixcbiAgICBkLm1vbnRoID09PSBudWxsID8gbnVsbCA6IGQubW9udGggLSAxLFxuICAgIGQuZGF5ID09PSBudWxsID8gMSA6IGQuZGF5LFxuICAgIGQuaG91cixcbiAgICBkLm1pbnV0ZSxcbiAgICBkLnNlY29uZCxcbiAgICBkLm1pbGxpc2Vjb25kXG4gIClcblxuICBjb25zdCB0ek9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXG4gIHJldHVybiBkLnRpbWV6b25lT2Zmc2V0ID09PSBudWxsIHx8IGQudGltZXpvbmVPZmZzZXQgPT09IHR6T2Zmc2V0XG4gICAgPyBkYXRlXG4gICAgOiBnZXRDaGFuZ2UoZGF0ZSwgeyBtaW51dGVzOiBkLnRpbWV6b25lT2Zmc2V0IC0gdHpPZmZzZXQgfSwgMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3BsaXREYXRlIChzdHIsIG1hc2ssIGRhdGVMb2NhbGUsIGNhbGVuZGFyLCBkZWZhdWx0TW9kZWwpIHtcbiAgY29uc3QgZGF0ZSA9IHtcbiAgICB5ZWFyOiBudWxsLFxuICAgIG1vbnRoOiBudWxsLFxuICAgIGRheTogbnVsbCxcbiAgICBob3VyOiBudWxsLFxuICAgIG1pbnV0ZTogbnVsbCxcbiAgICBzZWNvbmQ6IG51bGwsXG4gICAgbWlsbGlzZWNvbmQ6IG51bGwsXG4gICAgdGltZXpvbmVPZmZzZXQ6IG51bGwsXG4gICAgZGF0ZUhhc2g6IG51bGwsXG4gICAgdGltZUhhc2g6IG51bGxcbiAgfVxuXG4gIGRlZmF1bHRNb2RlbCAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24oZGF0ZSwgZGVmYXVsdE1vZGVsKVxuXG4gIGlmIChcbiAgICBzdHIgPT09IHZvaWQgMFxuICAgIHx8IHN0ciA9PT0gbnVsbFxuICAgIHx8IHN0ciA9PT0gJydcbiAgICB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJ1xuICApIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3RcbiAgICBsYW5nT3B0cyA9IGdldERhdGVMb2NhbGUoZGF0ZUxvY2FsZSwgTGFuZy5wcm9wcyksXG4gICAgbW9udGhzID0gbGFuZ09wdHMubW9udGhzLFxuICAgIG1vbnRoc1Nob3J0ID0gbGFuZ09wdHMubW9udGhzU2hvcnRcblxuICBjb25zdCB7IHJlZ2V4LCBtYXAgfSA9IGdldFJlZ2V4RGF0YShtYXNrLCBsYW5nT3B0cylcblxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWdleClcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgbGV0IHR6U3RyaW5nID0gJydcblxuICBpZiAobWFwLlggIT09IHZvaWQgMCB8fCBtYXAueCAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc3RhbXAgPSBwYXJzZUludChtYXRjaFsgbWFwLlggIT09IHZvaWQgMCA/IG1hcC5YIDogbWFwLnggXSwgMTApXG5cbiAgICBpZiAoaXNOYU4oc3RhbXApID09PSB0cnVlIHx8IHN0YW1wIDwgMCkge1xuICAgICAgcmV0dXJuIGRhdGVcbiAgICB9XG5cbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RhbXAgKiAobWFwLlggIT09IHZvaWQgMCA/IDEwMDAgOiAxKSlcblxuICAgIGRhdGUueWVhciA9IGQuZ2V0RnVsbFllYXIoKVxuICAgIGRhdGUubW9udGggPSBkLmdldE1vbnRoKCkgKyAxXG4gICAgZGF0ZS5kYXkgPSBkLmdldERhdGUoKVxuICAgIGRhdGUuaG91ciA9IGQuZ2V0SG91cnMoKVxuICAgIGRhdGUubWludXRlID0gZC5nZXRNaW51dGVzKClcbiAgICBkYXRlLnNlY29uZCA9IGQuZ2V0U2Vjb25kcygpXG4gICAgZGF0ZS5taWxsaXNlY29uZCA9IGQuZ2V0TWlsbGlzZWNvbmRzKClcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAobWFwLllZWVkgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS55ZWFyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5ZWVlZIF0sIDEwKVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuWVkgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuWVkgXSwgMTApXG4gICAgICBkYXRlLnllYXIgPSB5IDwgMCA/IHkgOiAyMDAwICsgeVxuICAgIH1cblxuICAgIGlmIChtYXAuTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5NIF0sIDEwKVxuICAgICAgaWYgKGRhdGUubW9udGggPCAxIHx8IGRhdGUubW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NICE9PSB2b2lkIDApIHtcbiAgICAgIGRhdGUubW9udGggPSBtb250aHNTaG9ydC5pbmRleE9mKG1hdGNoWyBtYXAuTU1NIF0pICsgMVxuICAgIH1cbiAgICBlbHNlIGlmIChtYXAuTU1NTSAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLm1vbnRoID0gbW9udGhzLmluZGV4T2YobWF0Y2hbIG1hcC5NTU1NIF0pICsgMVxuICAgIH1cblxuICAgIGlmIChtYXAuRCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmRheSA9IHBhcnNlSW50KG1hdGNoWyBtYXAuRCBdLCAxMClcblxuICAgICAgaWYgKGRhdGUueWVhciA9PT0gbnVsbCB8fCBkYXRlLm1vbnRoID09PSBudWxsIHx8IGRhdGUuZGF5IDwgMSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXhEYXkgPSBjYWxlbmRhciAhPT0gJ3BlcnNpYW4nXG4gICAgICAgID8gKG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgMCkpLmdldERhdGUoKVxuICAgICAgICA6IGphbGFhbGlNb250aExlbmd0aChkYXRlLnllYXIsIGRhdGUubW9udGgpXG5cbiAgICAgIGlmIChkYXRlLmRheSA+IG1heERheSkge1xuICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXAuSCAhPT0gdm9pZCAwKSB7XG4gICAgICBkYXRlLmhvdXIgPSBwYXJzZUludChtYXRjaFsgbWFwLkggXSwgMTApICUgMjRcbiAgICB9XG4gICAgZWxzZSBpZiAobWFwLmggIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5ob3VyID0gcGFyc2VJbnQobWF0Y2hbIG1hcC5oIF0sIDEwKSAlIDEyXG4gICAgICBpZiAoXG4gICAgICAgIChtYXAuQSAmJiBtYXRjaFsgbWFwLkEgXSA9PT0gJ1BNJylcbiAgICAgICAgfHwgKG1hcC5hICYmIG1hdGNoWyBtYXAuYSBdID09PSAncG0nKVxuICAgICAgICB8fCAobWFwLmFhICYmIG1hdGNoWyBtYXAuYWEgXSA9PT0gJ3AubS4nKVxuICAgICAgKSB7XG4gICAgICAgIGRhdGUuaG91ciArPSAxMlxuICAgICAgfVxuICAgICAgZGF0ZS5ob3VyID0gZGF0ZS5ob3VyICUgMjRcbiAgICB9XG5cbiAgICBpZiAobWFwLm0gIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taW51dGUgPSBwYXJzZUludChtYXRjaFsgbWFwLm0gXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLnMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5zZWNvbmQgPSBwYXJzZUludChtYXRjaFsgbWFwLnMgXSwgMTApICUgNjBcbiAgICB9XG5cbiAgICBpZiAobWFwLlMgIT09IHZvaWQgMCkge1xuICAgICAgZGF0ZS5taWxsaXNlY29uZCA9IHBhcnNlSW50KG1hdGNoWyBtYXAuUyBdLCAxMCkgKiAxMCAqKiAoMyAtIG1hdGNoWyBtYXAuUyBdLmxlbmd0aClcbiAgICB9XG5cbiAgICBpZiAobWFwLlogIT09IHZvaWQgMCB8fCBtYXAuWlogIT09IHZvaWQgMCkge1xuICAgICAgdHpTdHJpbmcgPSAobWFwLlogIT09IHZvaWQgMCA/IG1hdGNoWyBtYXAuWiBdLnJlcGxhY2UoJzonLCAnJykgOiBtYXRjaFsgbWFwLlpaIF0pXG4gICAgICBkYXRlLnRpbWV6b25lT2Zmc2V0ID0gKHR6U3RyaW5nWyAwIF0gPT09ICcrJyA/IC0xIDogMSkgKiAoNjAgKiB0elN0cmluZy5zbGljZSgxLCAzKSArIDEgKiB0elN0cmluZy5zbGljZSgzLCA1KSlcbiAgICB9XG4gIH1cblxuICBkYXRlLmRhdGVIYXNoID0gcGFkKGRhdGUueWVhciwgNCkgKyAnLycgKyBwYWQoZGF0ZS5tb250aCkgKyAnLycgKyBwYWQoZGF0ZS5kYXkpXG4gIGRhdGUudGltZUhhc2ggPSBwYWQoZGF0ZS5ob3VyKSArICc6JyArIHBhZChkYXRlLm1pbnV0ZSkgKyAnOicgKyBwYWQoZGF0ZS5zZWNvbmQpICsgdHpTdHJpbmdcblxuICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCAoZGF0ZSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGUgPT09ICdudW1iZXInXG4gICAgPyB0cnVlXG4gICAgOiBpc05hTihEYXRlLnBhcnNlKGRhdGUpKSA9PT0gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGF0ZSAobW9kLCB1dGMpIHtcbiAgcmV0dXJuIGFkanVzdERhdGUobmV3IERhdGUoKSwgbW9kLCB1dGMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZldlZWsgKGRhdGUpIHtcbiAgY29uc3QgZG93ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KClcbiAgcmV0dXJuIGRvdyA9PT0gMCA/IDcgOiBkb3dcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtPZlllYXIgKGRhdGUpIHtcbiAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG4gIGNvbnN0IHRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKVxuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICB0aHVyc2RheS5zZXREYXRlKHRodXJzZGF5LmdldERhdGUoKSAtICgodGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMylcblxuICAvLyBUYWtlIEphbnVhcnkgNHRoIGFzIGl0IGlzIGFsd2F5cyBpbiB3ZWVrIDEgKHNlZSBJU08gODYwMSlcbiAgY29uc3QgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpXG5cbiAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG4gIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKVxuXG4gIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcbiAgY29uc3QgZHMgPSB0aHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpXG4gIHRodXJzZGF5LnNldEhvdXJzKHRodXJzZGF5LmdldEhvdXJzKCkgLSBkcylcblxuICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG4gIGNvbnN0IHdlZWtEaWZmID0gKHRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoTUlMTElTRUNPTkRTX0lOX0RBWSAqIDcpXG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZilcbn1cblxuZnVuY3Rpb24gZ2V0RGF5SWRlbnRpZmllciAoZGF0ZSkge1xuICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICogMTAwMDAgKyBkYXRlLmdldE1vbnRoKCkgKiAxMDAgKyBkYXRlLmdldERhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXREYXRlSWRlbnRpZmllciAoZGF0ZSwgb25seURhdGUgLyogPSBmYWxzZSAqLykge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSlcbiAgcmV0dXJuIG9ubHlEYXRlID09PSB0cnVlID8gZ2V0RGF5SWRlbnRpZmllcihkKSA6IGQuZ2V0VGltZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW5EYXRlcyAoZGF0ZSwgZnJvbSwgdG8sIG9wdHMgPSB7fSkge1xuICBjb25zdFxuICAgIGQxID0gZ2V0RGF0ZUlkZW50aWZpZXIoZnJvbSwgb3B0cy5vbmx5RGF0ZSksXG4gICAgZDIgPSBnZXREYXRlSWRlbnRpZmllcih0bywgb3B0cy5vbmx5RGF0ZSksXG4gICAgY3VyID0gZ2V0RGF0ZUlkZW50aWZpZXIoZGF0ZSwgb3B0cy5vbmx5RGF0ZSlcblxuICByZXR1cm4gKGN1ciA+IGQxIHx8IChvcHRzLmluY2x1c2l2ZUZyb20gPT09IHRydWUgJiYgY3VyID09PSBkMSkpXG4gICAgJiYgKGN1ciA8IGQyIHx8IChvcHRzLmluY2x1c2l2ZVRvID09PSB0cnVlICYmIGN1ciA9PT0gZDIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9EYXRlIChkYXRlLCBtb2QpIHtcbiAgcmV0dXJuIGdldENoYW5nZShkYXRlLCBtb2QsIDEpXG59XG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3RGcm9tRGF0ZSAoZGF0ZSwgbW9kKSB7XG4gIHJldHVybiBnZXRDaGFuZ2UoZGF0ZSwgbW9kLCAtMSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgwKVxuICAgIGNhc2UgJ21vbnRoJzpcbiAgICBjYXNlICdtb250aHMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9RGF0ZWAgXSgxKVxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Ib3Vyc2AgXSgwKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oMClcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgdFsgYCR7IHByZWZpeCB9U2Vjb25kc2AgXSgwKVxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1NaWxsaXNlY29uZHNgIF0oMClcbiAgfVxuICByZXR1cm4gdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZEYXRlIChkYXRlLCB1bml0LCB1dGMpIHtcbiAgY29uc3RcbiAgICB0ID0gbmV3IERhdGUoZGF0ZSksXG4gICAgcHJlZml4ID0gYHNldCR7IHV0YyA9PT0gdHJ1ZSA/ICdVVEMnIDogJycgfWBcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgICB0WyBgJHsgcHJlZml4IH1Nb250aGAgXSgxMSlcbiAgICBjYXNlICdtb250aCc6XG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfURhdGVgIF0oZGF5c0luTW9udGgodCkpXG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfUhvdXJzYCBdKDIzKVxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbnV0ZXNgIF0oNTkpXG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfVNlY29uZHNgIF0oNTkpXG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIHRbIGAkeyBwcmVmaXggfU1pbGxpc2Vjb25kc2AgXSg5OTkpXG4gIH1cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1heERhdGUgKGRhdGUgLyogLCAuLi5hcmdzICovKSB7XG4gIGxldCB0ID0gbmV3IERhdGUoZGF0ZSlcbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGQgPT4ge1xuICAgIHQgPSBNYXRoLm1heCh0LCBuZXcgRGF0ZShkKSlcbiAgfSlcbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkRhdGUgKGRhdGUgLyosIC4uLmFyZ3MgKi8pIHtcbiAgbGV0IHQgPSBuZXcgRGF0ZShkYXRlKVxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZCA9PiB7XG4gICAgdCA9IE1hdGgubWluKHQsIG5ldyBEYXRlKGQpKVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5mdW5jdGlvbiBnZXREaWZmICh0LCBzdWIsIGludGVydmFsKSB7XG4gIHJldHVybiAoXG4gICAgKHQuZ2V0VGltZSgpIC0gdC5nZXRUaW1lem9uZU9mZnNldCgpICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgICAtIChzdWIuZ2V0VGltZSgpIC0gc3ViLmdldFRpbWV6b25lT2Zmc2V0KCkgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICApIC8gaW50ZXJ2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGVEaWZmIChkYXRlLCBzdWJ0cmFjdCwgdW5pdCA9ICdkYXlzJykge1xuICBjb25zdFxuICAgIHQgPSBuZXcgRGF0ZShkYXRlKSxcbiAgICBzdWIgPSBuZXcgRGF0ZShzdWJ0cmFjdClcblxuICBzd2l0Y2ggKHVuaXQpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKVxuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICBjYXNlICdtb250aCc6XG4gICAgICByZXR1cm4gKHQuZ2V0RnVsbFllYXIoKSAtIHN1Yi5nZXRGdWxsWWVhcigpKSAqIDEyICsgdC5nZXRNb250aCgpIC0gc3ViLmdldE1vbnRoKClcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnZGF5JyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ2RheScpLCBNSUxMSVNFQ09ORFNfSU5fREFZKVxuXG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgICAgcmV0dXJuIGdldERpZmYoc3RhcnRPZkRhdGUodCwgJ2hvdXInKSwgc3RhcnRPZkRhdGUoc3ViLCAnaG91cicpLCBNSUxMSVNFQ09ORFNfSU5fSE9VUilcblxuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICByZXR1cm4gZ2V0RGlmZihzdGFydE9mRGF0ZSh0LCAnbWludXRlJyksIHN0YXJ0T2ZEYXRlKHN1YiwgJ21pbnV0ZScpLCBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuXG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgIHJldHVybiBnZXREaWZmKHN0YXJ0T2ZEYXRlKHQsICdzZWNvbmQnKSwgc3RhcnRPZkRhdGUoc3ViLCAnc2Vjb25kJyksIDEwMDApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU9mWWVhciAoZGF0ZSkge1xuICByZXR1cm4gZ2V0RGF0ZURpZmYoZGF0ZSwgc3RhcnRPZkRhdGUoZGF0ZSwgJ3llYXInKSwgJ2RheXMnKSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluZmVyRGF0ZUZvcm1hdCAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyAnZGF0ZSdcbiAgICA6ICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicgPyAnbnVtYmVyJyA6ICdzdHJpbmcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZUJldHdlZW4gKGRhdGUsIG1pbiwgbWF4KSB7XG4gIGNvbnN0IHQgPSBuZXcgRGF0ZShkYXRlKVxuXG4gIGlmIChtaW4pIHtcbiAgICBjb25zdCBsb3cgPSBuZXcgRGF0ZShtaW4pXG4gICAgaWYgKHQgPCBsb3cpIHtcbiAgICAgIHJldHVybiBsb3dcbiAgICB9XG4gIH1cblxuICBpZiAobWF4KSB7XG4gICAgY29uc3QgaGlnaCA9IG5ldyBEYXRlKG1heClcbiAgICBpZiAodCA+IGhpZ2gpIHtcbiAgICAgIHJldHVybiBoaWdoXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZURhdGUgKGRhdGUsIGRhdGUyLCB1bml0KSB7XG4gIGNvbnN0XG4gICAgdCA9IG5ldyBEYXRlKGRhdGUpLFxuICAgIGQgPSBuZXcgRGF0ZShkYXRlMilcblxuICBpZiAodW5pdCA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIHQuZ2V0VGltZSgpID09PSBkLmdldFRpbWUoKVxuICB9XG5cbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICAgIGlmICh0LmdldFNlY29uZHMoKSAhPT0gZC5nZXRTZWNvbmRzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnbWludXRlJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICBpZiAodC5nZXRNaW51dGVzKCkgIT09IGQuZ2V0TWludXRlcygpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ2hvdXInOiAvLyBpbnRlbnRpb25hbCBmYWxsLXRocm91Z2hcbiAgICBjYXNlICdob3Vycyc6XG4gICAgICBpZiAodC5nZXRIb3VycygpICE9PSBkLmdldEhvdXJzKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgY2FzZSAnZGF5JzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICBpZiAodC5nZXREYXRlKCkgIT09IGQuZ2V0RGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIGNhc2UgJ21vbnRoJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIGlmICh0LmdldE1vbnRoKCkgIT09IGQuZ2V0TW9udGgoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICBjYXNlICd5ZWFyJzogLy8gaW50ZW50aW9uYWwgZmFsbC10aHJvdWdoXG4gICAgY2FzZSAneWVhcnMnOlxuICAgICAgaWYgKHQuZ2V0RnVsbFllYXIoKSAhPT0gZC5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBkYXRlIGlzU2FtZURhdGUgdW5rbm93biB1bml0ICR7IHVuaXQgfWApXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luTW9udGggKGRhdGUpIHtcbiAgcmV0dXJuIChuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApKS5nZXREYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0T3JkaW5hbCAobikge1xuICBpZiAobiA+PSAxMSAmJiBuIDw9IDEzKSB7XG4gICAgcmV0dXJuIGAkeyBuIH10aGBcbiAgfVxuICBzd2l0Y2ggKG4gJSAxMCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGAkeyBuIH1zdGBcbiAgICBjYXNlIDI6IHJldHVybiBgJHsgbiB9bmRgXG4gICAgY2FzZSAzOiByZXR1cm4gYCR7IG4gfXJkYFxuICB9XG4gIHJldHVybiBgJHsgbiB9dGhgXG59XG5cbmNvbnN0IGZvcm1hdHRlciA9IHtcbiAgLy8gWWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gIFlZIChkYXRlLCBkYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIGNvbnN0IHkgPSB0aGlzLllZWVkoZGF0ZSwgZGF0ZUxvY2FsZSwgZm9yY2VkWWVhcikgJSAxMDBcbiAgICByZXR1cm4geSA+PSAwXG4gICAgICA/IHBhZCh5KVxuICAgICAgOiAnLScgKyBwYWQoTWF0aC5hYnMoeSkpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gIFlZWVkgKGRhdGUsIF9kYXRlTG9jYWxlLCBmb3JjZWRZZWFyKSB7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3IgPCAxOTAwIHdpdGggbmV3IERhdGUoKVxuICAgIHJldHVybiBmb3JjZWRZZWFyICE9PSB2b2lkIDAgJiYgZm9yY2VkWWVhciAhPT0gbnVsbFxuICAgICAgPyBmb3JjZWRZZWFyXG4gICAgICA6IGRhdGUuZ2V0RnVsbFllYXIoKVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gIE0gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gIE1vIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldE9yZGluYWwoZGF0ZS5nZXRNb250aCgpICsgMSlcbiAgfSxcblxuICAvLyBNb250aDogMDEsIDAyLCAuLi4sIDEyXG4gIE1NIChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKVxuICB9LFxuXG4gIC8vIE1vbnRoIFNob3J0IE5hbWU6IEphbiwgRmViLCAuLi5cbiAgTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzU2hvcnRbIGRhdGUuZ2V0TW9udGgoKSBdXG4gIH0sXG5cbiAgLy8gTW9udGggTmFtZTogSmFudWFyeSwgRmVicnVhcnksIC4uLlxuICBNTU1NIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUubW9udGhzWyBkYXRlLmdldE1vbnRoKCkgXVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgUSAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0TW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgUW8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbCh0aGlzLlEoZGF0ZSkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gIEQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKClcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDFzdCwgMm5kLCAuLi4sIDMxc3RcbiAgRG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICBERCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXREYXRlKCkpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gIERERCAoZGF0ZSkge1xuICAgIHJldHVybiBnZXREYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMXN0LCAybmQsIC4uLiwgMzY2dGhcbiAgREREbyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRPcmRpbmFsKGdldERheU9mWWVhcihkYXRlKSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gIEREREQgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGdldERheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogMCwgMSwgLi4uLCA2XG4gIGQgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXREYXkoKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwdGgsIDFzdCwgLi4uLCA2dGhcbiAgZG8gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChkYXRlLmdldERheSgpKVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdSwgTW8sIC4uLlxuICBkZCAoZGF0ZSwgZGF0ZUxvY2FsZSkge1xuICAgIHJldHVybiAoZGF0ZUxvY2FsZS5kYXlzWyBkYXRlLmdldERheSgpIF0pLnNsaWNlKDAsIDIpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IFN1biwgTW9uLCAuLi5cbiAgZGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUuZGF5c1Nob3J0WyBkYXRlLmdldERheSgpIF1cbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuZGF5LCBNb25kYXksIC4uLlxuICBkZGRkIChkYXRlLCBkYXRlTG9jYWxlKSB7XG4gICAgcmV0dXJuIGRhdGVMb2NhbGUuZGF5c1sgZGF0ZS5nZXREYXkoKSBdXG4gIH0sXG5cbiAgLy8gRGF5IG9mIElTTyB3ZWVrOiAxLCAyLCAuLi4sIDdcbiAgRSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERheSgpIHx8IDdcbiAgfSxcblxuICAvLyBXZWVrIG9mIFllYXI6IDEgMiAuLi4gNTIgNTNcbiAgdyAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRXZWVrT2ZZZWFyKGRhdGUpXG4gIH0sXG5cbiAgLy8gV2VlayBvZiBZZWFyOiAxc3QgMm5kIC4uLiA1Mm5kIDUzcmRcbiAgd28gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0T3JkaW5hbChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIFdlZWsgb2YgWWVhcjogMDEgMDIgLi4uIDUyIDUzXG4gIHd3IChkYXRlKSB7XG4gICAgcmV0dXJuIHBhZChnZXRXZWVrT2ZZZWFyKGRhdGUpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAsIDEsIC4uLiAyM1xuICBIIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAwLCAwMSwgLi4uLCAyM1xuICBISCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRIb3VycygpKVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgaCAoZGF0ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpXG4gICAgcmV0dXJuIGhvdXJzID09PSAwXG4gICAgICA/IDEyXG4gICAgICA6IChob3VycyA+IDEyID8gaG91cnMgJSAxMiA6IGhvdXJzKVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICBoaCAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQodGhpcy5oKGRhdGUpKVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMCwgMSwgLi4uLCA1OVxuICBtIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwMCwgMDEsIC4uLiwgNTlcbiAgbW0gKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICBzIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwMCwgMDEsIC4uLiwgNTlcbiAgc3MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKGRhdGUuZ2V0U2Vjb25kcygpKVxuICB9LFxuXG4gIC8vIDEvMTAgb2Ygc2Vjb25kOiAwLCAxLCAuLi4sIDlcbiAgUyAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDApXG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgU1MgKGRhdGUpIHtcbiAgICByZXR1cm4gcGFkKE1hdGguZmxvb3IoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwKSlcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZDogMDAwLCAwMDEsIC4uLiwgOTk5XG4gIFNTUyAoZGF0ZSkge1xuICAgIHJldHVybiBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMylcbiAgfSxcblxuICAvLyBNZXJpZGllbTogQU0sIFBNXG4gIEEgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuICB9LFxuXG4gIC8vIE1lcmlkaWVtOiBhbSwgcG1cbiAgYSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/ICdhbScgOiAncG0nXG4gIH0sXG5cbiAgLy8gTWVyaWRpZW06IGEubS4sIHAubS5cbiAgYWEgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnYS5tLicgOiAncC5tLidcbiAgfSxcblxuICAvLyBUaW1lem9uZTogLTAxOjAwLCArMDA6MDAsIC4uLiArMTI6MDBcbiAgWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldCwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICBaWiAoZGF0ZSwgX2RhdGVMb2NhbGUsIF9mb3JjZWRZZWFyLCBmb3JjZWRUaW1lem9uZU9mZnNldCkge1xuICAgIGNvbnN0IHR6T2Zmc2V0ID0gZm9yY2VkVGltZXpvbmVPZmZzZXQgPT09IHZvaWQgMCB8fCBmb3JjZWRUaW1lem9uZU9mZnNldCA9PT0gbnVsbFxuICAgICAgPyBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIDogZm9yY2VkVGltZXpvbmVPZmZzZXRcblxuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0ek9mZnNldClcbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwXG4gIFggKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApXG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gIHggKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRUaW1lKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZSAodmFsLCBtYXNrLCBkYXRlTG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpIHtcbiAgaWYgKFxuICAgICh2YWwgIT09IDAgJiYgIXZhbClcbiAgICB8fCB2YWwgPT09IEluZmluaXR5XG4gICAgfHwgdmFsID09PSAtSW5maW5pdHlcbiAgKSByZXR1cm5cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsKVxuXG4gIGlmIChpc05hTihkYXRlKSkgcmV0dXJuXG5cbiAgaWYgKG1hc2sgPT09IHZvaWQgMCkge1xuICAgIG1hc2sgPSBkZWZhdWx0TWFza1xuICB9XG5cbiAgY29uc3QgbG9jYWxlID0gZ2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlLCBMYW5nLnByb3BzKVxuXG4gIHJldHVybiBtYXNrLnJlcGxhY2UoXG4gICAgdG9rZW4sXG4gICAgKG1hdGNoLCB0ZXh0KSA9PiAoXG4gICAgICBtYXRjaCBpbiBmb3JtYXR0ZXJcbiAgICAgICAgPyBmb3JtYXR0ZXJbIG1hdGNoIF0oZGF0ZSwgbG9jYWxlLCBfX2ZvcmNlZFllYXIsIF9fZm9yY2VkVGltZXpvbmVPZmZzZXQpXG4gICAgICAgIDogKHRleHQgPT09IHZvaWQgMCA/IG1hdGNoIDogdGV4dC5zcGxpdCgnXFxcXF0nKS5qb2luKCddJykpXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSAoZGF0ZSkge1xuICByZXR1cm4gaXNEYXRlKGRhdGUpID09PSB0cnVlXG4gICAgPyBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSlcbiAgICA6IGRhdGVcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc1ZhbGlkLFxuICBleHRyYWN0RGF0ZSxcbiAgYnVpbGREYXRlLFxuICBnZXREYXlPZldlZWssXG4gIGdldFdlZWtPZlllYXIsXG4gIGlzQmV0d2VlbkRhdGVzLFxuICBhZGRUb0RhdGUsXG4gIHN1YnRyYWN0RnJvbURhdGUsXG4gIGFkanVzdERhdGUsXG4gIHN0YXJ0T2ZEYXRlLFxuICBlbmRPZkRhdGUsXG4gIGdldE1heERhdGUsXG4gIGdldE1pbkRhdGUsXG4gIGdldERhdGVEaWZmLFxuICBnZXREYXlPZlllYXIsXG4gIGluZmVyRGF0ZUZvcm1hdCxcbiAgZ2V0RGF0ZUJldHdlZW4sXG4gIGlzU2FtZURhdGUsXG4gIGRheXNJbk1vbnRoLFxuICBmb3JtYXREYXRlLFxuICBjbG9uZVxufVxuIiwiaW1wb3J0IHtkYXRlfSBmcm9tIFwicXVhc2FyXCI7XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgZ2l2ZW4gSVNPIGRhdGUgc3RyaW5nIGludG8gYSBzcGVjaWZpYyBmb3JtYXQuXG4gKiBUaGUgb3V0cHV0IGZvcm1hdCBpcyBcIkRELk1NLllZWVkgSEg6bW1cIi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaXNvRGF0ZSAtIFRoZSBJU08gODYwMSBkYXRlIHN0cmluZyB0byBiZSBmb3JtYXR0ZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcgaW4gdGhlIFwiREQuTU0uWVlZWSBISDptbVwiIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoaXNvRGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmZvcm1hdERhdGUoRGF0ZS5wYXJzZShpc29EYXRlKSwgXCJERC5NTS5ZWVlZIEhIOm1tXCIpO1xufVxuIiwiLyoqXG4gKiBEaWN0aW9uYXJ5IHV0aWxpdGllcyBmb3IgdG9kbyBpdGVtIHN0YXRlcyBhbmQgcHJpb3JpdGllc1xuICogTWFwcyBzdGF0ZSBhbmQgcHJpb3JpdHkgSURzIHRvIHRoZWlyIGRpc3BsYXkgYXR0cmlidXRlcyAoY29sb3JzLCBpY29ucylcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuLy8gU3RhdGUgZGlzcGxheSBhdHRyaWJ1dGVzOiBjb2xvciBhbmQgaWNvbiBmb3IgZWFjaCBzdGF0ZVxuY29uc3QgU1RBVEVfQVRUUklCVVRFUyA9IHtcbiAgICBcIk5FXCI6IHtpZDogXCJORVwiLCBjb2xvcjogXCJibHVlLTVcIiwgaWNvbjogXCJjb250ZW50X3Bhc3RlXCJ9LFxuICAgIFwiUEVcIjoge2lkOiBcIlBFXCIsIGNvbG9yOiBcIm9yYW5nZS01XCIsIGljb246IFwicGVuZGluZ19hY3Rpb25zXCJ9LFxuICAgIFwiSVBcIjoge2lkOiBcIklQXCIsIGNvbG9yOiBcImJsdWUtNVwiLCBpY29uOiBcInJvd2luZ1wifSxcbiAgICBcIkRPXCI6IHtpZDogXCJET1wiLCBjb2xvcjogXCJncmVlbi01XCIsIGljb246IFwidGFza19hbHRcIn0sXG4gICAgXCJVTlwiOiB7aWQ6IFwiVU5cIiwgY29sb3I6IFwiZ3JleS01XCIsIGljb246IFwiaGVscF9vdXRsaW5lXCJ9XG59O1xuXG4vLyBQcmlvcml0eSBkaXNwbGF5IGF0dHJpYnV0ZXM6IGNvbG9yIGZvciBlYWNoIHByaW9yaXR5XG5jb25zdCBQUklPUklUWV9BVFRSSUJVVEVTID0ge1xuICAgIFwiQStcIjoge2lkOiBcIkErXCIsIGNvbG9yOiBcInJlZC01XCJ9LFxuICAgIFwiQUFcIjoge2lkOiBcIkFBXCIsIGNvbG9yOiBcIm9yYW5nZS01XCJ9LFxuICAgIFwiQkJcIjoge2lkOiBcIkJCXCIsIGNvbG9yOiBcImdyZWVuLTVcIn0sXG4gICAgXCJDQ1wiOiB7aWQ6IFwiQ0NcIiwgY29sb3I6IFwiYmx1ZS01XCJ9LFxuICAgIFwiQy1cIjoge2lkOiBcIkMtXCIsIGNvbG9yOiBcImJsdWUtNVwifSxcbiAgICBcIlVOXCI6IHtpZDogXCJVTlwiLCBjb2xvcjogXCJncmV5LTVcIn1cbn07XG5cbi8qKlxuICogR2V0cyB0aGUgZGlzcGxheSBhdHRyaWJ1dGVzIGZvciBhIGdpdmVuIHN0YXRlIElEXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlSWQgLSBUaGUgc3RhdGUgSUQgKGUuZy4sIFwiTkVcIiwgXCJQRVwiLCBcIklQXCIsIFwiRE9cIilcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggaWQsIGNvbG9yLCBhbmQgaWNvbi4gUmV0dXJucyBcIlVOXCIgKHVua25vd24pIGlmIHN0YXRlIG5vdCBmb3VuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdGVBdHRyaWJ1dGVzKHN0YXRlSWQpIHtcbiAgICByZXR1cm4gU1RBVEVfQVRUUklCVVRFU1tzdGF0ZUlkXSB8fCBTVEFURV9BVFRSSUJVVEVTW1wiVU5cIl07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGlzcGxheSBhdHRyaWJ1dGVzIGZvciBhIGdpdmVuIHByaW9yaXR5IElEXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByaW9yaXR5SWQgLSBUaGUgcHJpb3JpdHkgSUQgKGUuZy4sIFwiQStcIiwgXCJBQVwiLCBcIkJCXCIsIFwiQ0NcIiwgXCJDLVwiKVxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBpZCBhbmQgY29sb3IuIFJldHVybnMgXCJVTlwiICh1bmtub3duKSBpZiBwcmlvcml0eSBub3QgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByaW9yaXR5QXR0cmlidXRlcyhwcmlvcml0eUlkKSB7XG4gICAgcmV0dXJuIFBSSU9SSVRZX0FUVFJJQlVURVNbcHJpb3JpdHlJZF0gfHwgUFJJT1JJVFlfQVRUUklCVVRFU1tcIlVOXCJdO1xufVxuIiwiLyoqXG4gKiBDb21wb3NhYmxlIHVzZU9wZXJhdGlvblByb2dyZXNzKClcbiAqIFNpbXBsZSBvcGVyYXRpb24gcHJvZ3Jlc3Mgc3RhdGUgbWFuYWdlbWVudCBmb3IgYXN5bmMgb3BlcmF0aW9uc1xuICogQGNvcHlyaWdodCBBbGFza2EgU29mdHdhcmUgSW5jLiAoYykgMjAyNi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQge2NvbXB1dGVkLCByZWZ9IGZyb20gXCJ2dWVcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2ltcGxlIG9wZXJhdGlvbiBwcm9ncmVzcyBzdGF0ZSB0cmFja2VyLlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHsgaXNSdW5uaW5nLCBpc0RvbmUgfSA9IHVzZU9wZXJhdGlvblByb2dyZXNzKCk7XG4gKiBpc1J1bm5pbmcudmFsdWUgPSB0cnVlOyAgLy8gbWFyayBvcGVyYXRpb24gYXMgc3RhcnRlZFxuICogaXNSdW5uaW5nLnZhbHVlID0gZmFsc2U7IC8vIG1hcmsgb3BlcmF0aW9uIGFzIGZpbmlzaGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VPcGVyYXRpb25Qcm9ncmVzcygpIHtcbiAgICBjb25zdCBpc1J1bm5pbmcgPSByZWYoZmFsc2UpO1xuICAgIGNvbnN0IGlzRG9uZSA9IGNvbXB1dGVkKCgpID0+ICFpc1J1bm5pbmcudmFsdWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNSdW5uaW5nLFxuICAgICAgICBpc0RvbmVcbiAgICB9XG59XG4iLCIvKipcbiAqIEVycm9yIGFuZCBub3RpZmljYXRpb24gbWVzc2FnZSBjb25zdGFudHNcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEVSUk9SX01FU1NBR0VTID0ge1xuICAgIExPQURfSVRFTVM6ICdFcnJvciB3aGlsZSBsb2FkaW5nIHRvZG8gaXRlbXMuIENoZWNrIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIGJhY2tlbmQuJyxcbiAgICBMT0FEX0lURU06IChpZCkgPT4gYEVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHRvZG8gaXRlbSAjJHtpZH0uIENoZWNrIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIGJhY2tlbmQuYCxcbiAgICBERUxFVEVfSVRFTTogKGlkKSA9PiBgRXJyb3Igd2hpbGUgZGVsZXRpbmcgdGhlIHRvZG8gaXRlbSAjJHtpZH1gLFxuICAgIFVQREFURV9JVEVNOiAoaWQpID0+IGBFcnJvciB3aGlsZSB1cGRhdGluZyB0aGUgdG9kbyBpdGVtICMke2lkfWAsXG4gICAgQ1JFQVRFX0lURU06ICdFcnJvciB3aGlsZSBjcmVhdGluZyBhIHRvZG8gaXRlbSdcbn07XG5cbmV4cG9ydCBjb25zdCBVSV9NRVNTQUdFUyA9IHtcbiAgICBTQVZFRDogJ1NhdmVkIScsXG4gICAgREVMRVRFRDogJ0RlbGV0ZWQhJyxcbiAgICBOT19UT0RPX0lURU1TOiAnTm8gdG9kbyBpdGVtcyBmb3VuZCdcbn07XG5cbmV4cG9ydCBjb25zdCBDT05GSVJNX01FU1NBR0VTID0ge1xuICAgIERFTEVURV9UT0RPX0lURU06ICh0b2RvSXRlbVRleHQpID0+XG4gICAgICAgIGBXb3VsZCB5b3UgbGlrZSB0byBkZWxldGUgdGhlIHRvZG8gaXRlbT9cXG5cIiR7dG9kb0l0ZW1UZXh0Py5zdWJzdHJpbmcoMCwgNTApIHx8ICcnfS4uLlwiYFxufTtcblxuZXhwb3J0IGNvbnN0IEhUVFBfRVJST1JfTUVTU0FHRVMgPSB7XG4gICAgNDAwOiAnTWlzc2luZy9lbXB0eSBpbnB1dCBkYXRhJyxcbiAgICA0MDE6ICdVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkJyxcbiAgICA0MDM6ICdVc2VyIGhhcyBubyBwZXJtaXNzaW9uIHRvIGV4ZWN1dGUnLFxuICAgIDQwNDogJ1JlcXVpcmVkIHJlc291cmNlIHdhcyBub3QgZm91bmQnLFxuICAgIDUwMDogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXG4gICAgREVGQVVMVDogJ1Vua25vd24gZXJyb3InXG59O1xuIiwiLyoqXG4gKiBTZXJ2aWNlIERhdGFTZXJ2aWNlXG4gKiBDb25zaXN0cyBvZiBzdGF0ZWxlc3MgbG9naWMgYW5kIGhhcyBmdW5jdGlvbnMgdGhhdCBzZW5kIEhUVFAgcmVxdWVzdHMgYW5kIHJlY2VpdmUgcmVzcG9uc2VzIGZyb20gdGhlIGJhY2tlbmQuXG4gKiBAY29weXJpZ2h0IEFsYXNrYSBTb2Z0d2FyZSBJbmMuIChjKSAyMDI2LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbmltcG9ydCB7IGF4aW9zSW5zdGFuY2UgfSBmcm9tICdzcmMvYm9vdC9heGlvcy5qcydcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBFUlJPUl9NRVNTQUdFUywgSFRUUF9FUlJPUl9NRVNTQUdFUyB9IGZyb20gJ3NyYy9jb25zdGFudHMvbWVzc2FnZXMuanMnO1xuXG5leHBvcnQgY29uc3QgQVBJX0VORFBPSU5UUyA9IHtcbiAgICBUT0RPX0lURU1TOiAndG9kb2l0ZW1zJyxcbiAgICBUT0RPX0lURU06IChpZCkgPT4gYHRvZG9pdGVtcy8ke2lkfWBcbn07XG5cbi8qKlxuICogR2VuZXJpYyBBUEkgY2FsbCB3cmFwcGVyIHdpdGggZXJyb3IgaGFuZGxpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wZXJhdGlvbiAtIFRoZSBhc3luYyBvcGVyYXRpb24gdG8gZXhlY3V0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGVycm9yQ29udGV4dCAtIEVycm9yIG1lc3NhZ2UgY29udGV4dFxuICogQHJldHVybnMge1Byb21pc2U8e3Jlc3VsdDogYW55LCBlcnJvcjogc3RyaW5nfG51bGx9Pn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2FsbEFwaShvcGVyYXRpb24sIGVycm9yQ29udGV4dCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3BlcmF0aW9uKCk7XG4gICAgICAgIHJldHVybiBjcmVhdGVSZXN1bHQocmVzcG9uc2UuZGF0YS5yZXN1bHQsIG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGhhbmRsZUVycm9yKGVycm9yLCBlcnJvckNvbnRleHQpO1xuICAgICAgICByZXR1cm4gY3JlYXRlUmVzdWx0KG51bGwsIGVycm9yTWVzc2FnZSk7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9kb0l0ZW1zKCkge1xuICAgIHJldHVybiBjYWxsQXBpKFxuICAgICAgICAoKSA9PiBheGlvc0luc3RhbmNlLmdldChBUElfRU5EUE9JTlRTLlRPRE9fSVRFTVMpLFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5MT0FEX0lURU1TXG4gICAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRvZG9JdGVtQnlJZChpZCkge1xuICAgIHJldHVybiBjYWxsQXBpKFxuICAgICAgICAoKSA9PiBheGlvc0luc3RhbmNlLmRlbGV0ZShBUElfRU5EUE9JTlRTLlRPRE9fSVRFTShpZCkpLFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5ERUxFVEVfSVRFTShpZClcbiAgICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9kb0l0ZW1CeUlkKGlkKSB7XG4gICAgcmV0dXJuIGNhbGxBcGkoXG4gICAgICAgICgpID0+IGF4aW9zSW5zdGFuY2UuZ2V0KEFQSV9FTkRQT0lOVFMuVE9ET19JVEVNKGlkKSksXG4gICAgICAgIEVSUk9SX01FU1NBR0VTLkxPQURfSVRFTShpZClcbiAgICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVG9kb0l0ZW0odG9kb0l0ZW0pIHtcbiAgICByZXR1cm4gY2FsbEFwaShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zSW5zdGFuY2UucHV0KEFQSV9FTkRQT0lOVFMuVE9ET19JVEVNKHRvZG9JdGVtLmlkKSwgdG9kb0l0ZW0pO1xuICAgICAgICB9LFxuICAgICAgICBFUlJPUl9NRVNTQUdFUy5VUERBVEVfSVRFTSh0b2RvSXRlbS5pZClcbiAgICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVG9kb0l0ZW0odG9kb0l0ZW0pIHtcbiAgICByZXR1cm4gY2FsbEFwaShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF4aW9zSW5zdGFuY2UucG9zdChBUElfRU5EUE9JTlRTLlRPRE9fSVRFTVMsIHRvZG9JdGVtKTtcbiAgICAgICAgfSxcbiAgICAgICAgRVJST1JfTUVTU0FHRVMuQ1JFQVRFX0lURU1cbiAgICApO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgbG9nRXJyb3JNZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihsb2dFcnJvck1lc3NhZ2UpO1xuICAgIGxldCBtZXNzYWdlO1xuICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSBhbmQgdGhlIHNlcnZlciByZXNwb25kZWQgd2l0aCBhIHN0YXR1cyBjb2RlXG4gICAgICAgIC8vIHRoYXQgZmFsbHMgb3V0IG9mIHRoZSByYW5nZSBvZiAyeHhcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkhUVFAgY29kZTogXCIsIGVycm9yLnJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBkYXRhOiBcIiwgZXJyb3IucmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIG1lc3NhZ2UgPSBcIkVycm9yOiBcIiArICgoZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcikgPyBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yIDogZ2V0RXJyb3JNZXNzYWdlQnlIdHRwQ29kZShlcnJvci5yZXNwb25zZS5zdGF0dXMpKTtcbiAgICB9IGVsc2UgaWYgKGVycm9yLnJlcXVlc3QpIHtcbiAgICAgICAgLy8gVGhlIHJlcXVlc3Qgd2FzIG1hZGUgYnV0IG5vIHJlc3BvbnNlIHdhcyByZWNlaXZlZCAoZS5nLiBuZXR3b3JrIHRpbWVvdXQgb3IgYmFja2VuZCB1bnJlYWNoYWJsZSlcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIHJlc3BvbnNlOiBcIiwgZXJyb3IucmVxdWVzdCk7XG4gICAgICAgIG1lc3NhZ2UgPSBsb2dFcnJvck1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZXRoaW5nIGhhcHBlbmVkIGluIHNldHRpbmcgdXAgdGhlIHJlcXVlc3QgdGhhdCB0cmlnZ2VyZWQgYW4gRXJyb3JcbiAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCByZXF1ZXN0OiAnLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgbWVzc2FnZSA9IGxvZ0Vycm9yTWVzc2FnZTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihlcnJvci5jb25maWcpO1xuICAgIHJldHVybiBtZXNzYWdlO1xufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2VCeUh0dHBDb2RlKGh0dHBDb2RlKSB7XG4gICAgcmV0dXJuIEhUVFBfRVJST1JfTUVTU0FHRVNbaHR0cENvZGVdIHx8IEhUVFBfRVJST1JfTUVTU0FHRVMuREVGQVVMVDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVzdWx0KHJlc3VsdCwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmRTZWN0aW9uJyxcblxuICBwcm9wczoge1xuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgaG9yaXpvbnRhbDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1jYXJkX19zZWN0aW9uJ1xuICAgICAgKyBgIHEtY2FyZF9fc2VjdGlvbi0tJHsgcHJvcHMuaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdob3JpeiByb3cgbm8td3JhcCcgOiAndmVydCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFsaWduLCB7IHVzZUFsaWduUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbGlnbi91c2UtYWxpZ24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmRBY3Rpb25zJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMsXG4gICAgdmVydGljYWw6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGFsaWduQ2xhc3MgPSB1c2VBbGlnbihwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtY2FyZF9fYWN0aW9ucyAkeyBhbGlnbkNsYXNzLnZhbHVlIH1gXG4gICAgICArIGAgcS1jYXJkX19hY3Rpb25zLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0IGNvbHVtbicgOiAnaG9yaXogcm93JyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2FyZCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWNhcmQnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1zcXVhcmUgbm8tYm9yZGVyLXJhZGl1cycgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtY2FyZC0tZmxhdCBuby1zaGFkb3cnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxzLCBnZXRQb3J0YWxQcm94eSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG4vKlxuICogZGVwdGhcbiAqICAgPCAwICAtLT4gY2xvc2UgYWxsIGNoYWluXG4gKiAgIDAgICAgLS0+IGRpc2FibGVkXG4gKiAgID4gMCAgLS0+IGNsb3NlIGNoYWluIHVwIHRvIE4gcGFyZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVwdGggKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNvbnN0IGRlcHRoID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuICByZXR1cm4gaXNOYU4oZGVwdGgpID8gMCA6IGRlcHRoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdjbG9zZS1wb3B1cCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnY2xvc2UtcG9wdXAnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgZGVwdGg6IGdldERlcHRoKHZhbHVlKSxcblxuICAgICAgICAgIGhhbmRsZXIgKGV2dCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgQGNsaWNrIHRvIGJlIGVtaXR0ZWRcbiAgICAgICAgICAgIGN0eC5kZXB0aCAhPT0gMCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBnZXRQb3J0YWxQcm94eShlbClcbiAgICAgICAgICAgICAgaWYgKHByb3h5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcnRhbHMocHJveHksIGV2dCwgY3R4LmRlcHRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBoYW5kbGVyS2V5IChldnQpIHtcbiAgICAgICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xY2xvc2Vwb3B1cCA9IGN0eFxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgZWwuX19xY2xvc2Vwb3B1cC5kZXB0aCA9IGdldERlcHRoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICAgIGRlbGV0ZSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxuICAgIDxxLWNhcmQ+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgICAgPHEtYXZhdGFyIDppY29uPVwiaWNvblwiIGNvbG9yPVwicHJpbWFyeVwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC05XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgbWVzc2FnZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIk5vXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cC8+XG4gICAgICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIlllc1wiIGNvbG9yPVwicHJpbWFyeVwiIHYtY2xvc2UtcG9wdXAgQGNsaWNrPVwieWVzQnV0dG9uQ2FsbGJhY2tcIi8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBDdXN0b20gY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICAgIGljb246IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcImluZm9cIlxuICAgIH0sXG4gICAgbWVzc2FnZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICB5ZXNCdXR0b25DYWxsYmFjazoge1xuICAgICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfVxufSk7XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IE5vdGlmeSB9IGZyb20gJ3F1YXNhcidcblxuLyoqXG4gKiBEaXNwbGF5cyBhIG5vdGlmaWNhdGlvbiBtZXNzYWdlIGJhc2VkIG9uIHdoZXRoZXIgdGhlcmUncyBhbiBlcnJvclxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGFzRXJyb3IgLSBJZiB0cnVlLCBzaG93cyBlcnJvciBub3RpZmljYXRpb247IG90aGVyd2lzZSBzaG93cyBzdWNjZXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VjY2Vzc01lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IG9uIHN1Y2Nlc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IG9uIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RpZnkoaGFzRXJyb3IsIHN1Y2Nlc3NNZXNzYWdlLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgbWVzc2FnZTogKGhhc0Vycm9yKSA/IGVycm9yTWVzc2FnZSA6IHN1Y2Nlc3NNZXNzYWdlLFxuICAgICAgICB0aW1lb3V0OiAoaGFzRXJyb3IpID8gMCA6IDIwMDAsXG4gICAgICAgIGljb246IChoYXNFcnJvcikgPyBcInJlcG9ydF9wcm9ibGVtXCIgOiBcImluZm9cIixcbiAgICAgICAgY29sb3I6IChoYXNFcnJvcikgPyBcIm9yYW5nZS02XCIgOiBcImJsdWUtNlwiLFxuICAgICAgICBhY3Rpb25zOiBbe2ljb246ICdjbG9zZScsIGNvbG9yOiAnd2hpdGUnfV1cbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5U3VjY2VzcyhtZXNzYWdlKSB7XG4gICAgbm90aWZ5KGZhbHNlLCBtZXNzYWdlLCAnJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3RpZnlFcnJvcihtZXNzYWdlKSB7XG4gICAgbm90aWZ5KHRydWUsICcnLCBtZXNzYWdlKTtcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8cS1iYW5uZXIgY2xhc3M9XCJiZy1ncmV5LTNcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphdmF0YXI+XG4gICAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiaWNvbk5hbWVcIiA6Y29sb3I9XCJpY29uQ29sb3JcIi8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIHt7IG1lc3NhZ2UgfX1cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphY3Rpb24+XG4gICAgICAgICAgICA8cS1idG4gdi1pZj1cImJ1dHRvbkxhYmVsXCIgY29sb3I9XCJibHVlLTEwXCIgOmxhYmVsPVwiYnV0dG9uTGFiZWxcIiBuby1jYXBzIEBjbGljaz1cImJ1dHRvbkNhbGxiYWNrXCIvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1iYW5uZXI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBDdXN0b20gY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGJhbm5lciBkaXNwbGF5aW5nIGEgbWVzc2FnZSAoZS5nLiBhbiBlcnJvciwgYW4gaW5mbyBub3RpY2UsIG9yIGFuIGVtcHR5LXN0YXRlIGhpbnQpXG4gKiBAY29weXJpZ2h0IEFsYXNrYSBTb2Z0d2FyZSBJbmMuIChjKSAyMDI2LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgICBpY29uTmFtZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwiaW5mb1wiXG4gICAgfSxcbiAgICBpY29uQ29sb3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiBcImJsdWUtMTBcIlxuICAgIH0sXG4gICAgbWVzc2FnZToge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBidXR0b25MYWJlbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH0sXG4gICAgYnV0dG9uQ2FsbGJhY2s6IHtcbiAgICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbn0pO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiaGFuZGxlcnMiLCJkYXRlIiwiTGFuZyIsImRhdGUyIiwiZm9ybWF0RGF0ZSIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUtPLE1BQU0scUJBQXFCO0FBQUEsRUFDaEMsVUFBVTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsV0FBVyxPQUFLO0FBQUEsTUFDZDtBQUFBLE1BQWE7QUFBQSxNQUNiO0FBQUEsTUFBZ0I7QUFBQSxNQUNoQjtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBVTtBQUFBLElBQ2hDLEVBQU0sU0FBUyxDQUFDO0FBQUEsRUFDaEI7QUFBQSxFQUNFLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNO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QUFDLE1BQU0sU0FBUyxPQUFPLFFBQU8sQ0FBQztBQUFBLEVBQ2pELENBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsVUFBTSxRQUFROzs7Ozs7O3NCQWhCVkQsWUFRVyxTQUFBLEVBQUEsT0FBQSxlQVJLO0FBQUEsSUFDSyxnQkFDYixNQUE2QztBQUFBLE1BQTdDQyxZQUE2QyxPQUFBO0FBQUEsUUFBcEMsTUFBTSxPQUFBO0FBQUEsUUFBVyxPQUFPLE9BQUE7QUFBQTs7SUFHcEIsZ0JBQ2IsTUFBZ0c7QUFBQSxNQUFuRixPQUFBLDRCQUFiRCxZQUFnRyxNQUFBO0FBQUE7UUFBdEUsT0FBTTtBQUFBLFFBQVcsT0FBTyxPQUFBO0FBQUEsUUFBYSxXQUFBO0FBQUEsUUFBUyxTQUFPLE9BQUE7QUFBQTs7cUJBSHhFLE1BQ1g7QUFBQSxzQkFEVyxNQUNYRyxnQkFBRyxPQUFBLE9BQU8sSUFBRyxLQUNiLENBQUE7QUFBQTs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTYsMTcsMTgsMTldfQ==
