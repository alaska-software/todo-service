import { a as onBeforeUnmount, av as History, w as watch, aw as vmHasRouter, o as onMounted, g as getCurrentInstance, n as nextTick, ax as getElement, ay as css, J as client, ae as listenOpts, G as stopAndPrevent, az as getEventPath, a6 as onDeactivated, ac as vmIsDestroyed } from "./index-D97wSuWx.js";
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  // optional
  hideOnRouteChange,
  // optional
  handleShow,
  // optional
  handleHide,
  // optional
  processOnMount
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt?.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) return;
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) return;
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) return;
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) return;
  } else {
    if (registered === 0) return;
    registered--;
    if (registered > 0) return;
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  };
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function pad(v, length = 2, char = "0") {
  if (v === void 0 || v === null) {
    return v;
  }
  const val = "" + v;
  return val.length >= length ? val : new Array(length - val.length + 1).join(char) + val;
}
export {
  useModelToggleProps as a,
  useTimeout as b,
  useModelToggle as c,
  useHistory as d,
  usePreventScroll as e,
  between as f,
  getScrollTarget as g,
  getVerticalScrollPosition as h,
  getHorizontalScrollPosition as i,
  getScrollbarWidth as j,
  capitalize as k,
  pad as p,
  scrollTargetProp as s,
  useModelToggleEmits as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LURFREJZMHVNLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1oaXN0b3J5L3VzZS1oaXN0b3J5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9zY3JvbGwvc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsL3ByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcHJldmVudC1zY3JvbGwvdXNlLXByZXZlbnQtc2Nyb2xsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9mb3JtYXQvZm9ybWF0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vcGx1Z2lucy9wcml2YXRlLmhpc3RvcnkvSGlzdG9yeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKSB7XG4gIGxldCBoaXN0b3J5RW50cnlcblxuICBmdW5jdGlvbiByZW1vdmVGcm9tSGlzdG9yeSAoKSB7XG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlRnJvbUhpc3RvcnksXG5cbiAgICBhZGRUb0hpc3RvcnkgKCkge1xuICAgICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgICBjb25kaXRpb246ICgpID0+IGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlLFxuICAgICAgICBoYW5kbGVyOiBoaWRlXG4gICAgICB9XG5cbiAgICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSlcbiAgICAgIHx8IChldnQ/LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzU2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Nob3cgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgIHNob3dpbmcudmFsdWUgPSB0cnVlXG5cbiAgICBlbWl0KCdiZWZvcmVTaG93JywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZVNob3cgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlU2hvdyhldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlIChldnQpIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fIHx8IHByb3BzLmRpc2FibGUgPT09IHRydWUpIHJldHVyblxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcblxuICAgIGVtaXQoJ2JlZm9yZUhpZGUnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlSGlkZSAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVIaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NNb2RlbENoYW5nZSAodmFsKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUgJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKHZhbCA9PT0gdHJ1ZSkgIT09IHNob3dpbmcudmFsdWUpIHtcbiAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gcHJvY2Vzc1Nob3cgOiBwcm9jZXNzSGlkZVxuICAgICAgZm4ocGF5bG9hZClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBwcm9jZXNzTW9kZWxDaGFuZ2UpXG5cbiAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlICE9PSB2b2lkIDAgJiYgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlKSB7XG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UudmFsdWUgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc09uTW91bnQgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9jZXNzTW9kZWxDaGFuZ2UocHJvcHMubW9kZWxWYWx1ZSlcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgY29uc3QgcHVibGljTWV0aG9kcyA9IHsgc2hvdywgaGlkZSwgdG9nZ2xlIH1cbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljTWV0aG9kcylcblxuICByZXR1cm4gcHVibGljTWV0aG9kc1xufVxuIiwiaW1wb3J0IHsgY3NzLCBnZXRFbGVtZW50IH0gZnJvbSAnLi4vZG9tL2RvbS5qcydcblxuZXhwb3J0IGNvbnN0IHNjcm9sbFRhcmdldFByb3AgPSBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7fSAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBFbGVtZW50ICovXG4gIDogWyBFbGVtZW50LCBTdHJpbmcgXVxuXG5jb25zdCBzY3JvbGxUYXJnZXRzID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gW11cbiAgOiBbIG51bGwsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LCBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVGFyZ2V0IChlbCwgdGFyZ2V0RWwpIHtcbiAgbGV0IHRhcmdldCA9IGdldEVsZW1lbnQodGFyZ2V0RWwpXG5cbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB3aW5kb3dcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBlbC5jbG9zZXN0KCcuc2Nyb2xsLC5zY3JvbGwteSwub3ZlcmZsb3ctYXV0bycpXG4gIH1cblxuICByZXR1cm4gc2Nyb2xsVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpXG4gICAgPyB3aW5kb3dcbiAgICA6IHRhcmdldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0IChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbEhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGggKGVsKSB7XG4gIHJldHVybiAoZWwgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBlbCkuc2Nyb2xsV2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgOiBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1WZXJ0aWNhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRTY3JvbGwoZWwsIG5ld1BvcylcbiAgICBpZiAobmV3UG9zICE9PSB0bykge1xuICAgICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltSG9yaXpvbnRhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGVsKVxuXG4gIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgaWYgKHBvcyAhPT0gdG8pIHtcbiAgICAgIHNldEhvcml6b250YWxTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgb2Zmc2V0KVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPSBvZmZzZXRcbn1cblxuZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKG9mZnNldCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgcmV0dXJuXG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnQgPSBvZmZzZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbikge1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICBhbmltVmVydGljYWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0U2Nyb2xsKHNjcm9sbFRhcmdldCwgb2Zmc2V0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbUhvcml6b250YWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0SG9yaXpvbnRhbFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxubGV0IHNpemVcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCAoKSB7XG4gIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2l6ZVxuICB9XG5cbiAgY29uc3RcbiAgICBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY3NzKGlubmVyLCB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcyMDBweCdcbiAgfSlcbiAgY3NzKG91dGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBsZWZ0OiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pXG5cbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcilcblxuICBjb25zdCB3MSA9IGlubmVyLm9mZnNldFdpZHRoXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgbGV0IHcyID0gaW5uZXIub2Zmc2V0V2lkdGhcblxuICBpZiAodzEgPT09IHcyKSB7XG4gICAgdzIgPSBvdXRlci5jbGllbnRXaWR0aFxuICB9XG5cbiAgb3V0ZXIucmVtb3ZlKClcbiAgc2l6ZSA9IHcxIC0gdzJcblxuICByZXR1cm4gc2l6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2Nyb2xsYmFyIChlbCwgb25ZID0gdHJ1ZSkge1xuICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIG9uWVxuICAgID8gKFxuICAgICAgICBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXknIF0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICA6IChcbiAgICAgICAgZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCAmJiAoXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKVxuICAgICAgICAgIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmZsb3ctYXV0bycpXG4gICAgICAgICAgfHwgWyAnYXV0bycsICdzY3JvbGwnIF0uaW5jbHVkZXMod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyAnb3ZlcmZsb3cteCcgXSlcbiAgICAgICAgKVxuICAgICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFNjcm9sbFRhcmdldCxcblxuICBnZXRTY3JvbGxIZWlnaHQsXG4gIGdldFNjcm9sbFdpZHRoLFxuXG4gIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sXG4gIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbixcblxuICBhbmltVmVydGljYWxTY3JvbGxUbyxcbiAgYW5pbUhvcml6b250YWxTY3JvbGxUbyxcblxuICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgZ2V0U2Nyb2xsYmFyV2lkdGgsXG4gIGhhc1Njcm9sbGJhclxufVxuIiwiaW1wb3J0IHsgaGFzU2Nyb2xsYmFyLCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuL3Njcm9sbC5qcydcbmltcG9ydCB7IGdldEV2ZW50UGF0aCwgbGlzdGVuT3B0cywgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmxldFxuICByZWdpc3RlcmVkID0gMCxcbiAgc2Nyb2xsUG9zaXRpb25YLFxuICBzY3JvbGxQb3NpdGlvblksXG4gIG1heFNjcm9sbFRvcCxcbiAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2UsXG4gIGJvZHlMZWZ0LFxuICBib2R5VG9wLFxuICBocmVmLFxuICBjbG9zZVRpbWVyID0gbnVsbFxuXG5mdW5jdGlvbiBvbldoZWVsIChlKSB7XG4gIGlmIChzaG91bGRQcmV2ZW50U2Nyb2xsKGUpKSB7XG4gICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRQcmV2ZW50U2Nyb2xsIChlKSB7XG4gIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtbGF5b3V0X19iYWNrZHJvcCcpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNvbnN0XG4gICAgcGF0aCA9IGdldEV2ZW50UGF0aChlKSxcbiAgICBzaGlmdCA9IGUuc2hpZnRLZXkgJiYgIWUuZGVsdGFYLFxuICAgIHNjcm9sbFkgPSAhc2hpZnQgJiYgTWF0aC5hYnMoZS5kZWx0YVgpIDw9IE1hdGguYWJzKGUuZGVsdGFZKSxcbiAgICBkZWx0YSA9IHNoaWZ0IHx8IHNjcm9sbFkgPyBlLmRlbHRhWSA6IGUuZGVsdGFYXG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWwgPSBwYXRoWyBpbmRleCBdXG5cbiAgICBpZiAoaGFzU2Nyb2xsYmFyKGVsLCBzY3JvbGxZKSkge1xuICAgICAgcmV0dXJuIHNjcm9sbFlcbiAgICAgICAgPyAoXG4gICAgICAgICAgICBkZWx0YSA8IDAgJiYgZWwuc2Nyb2xsVG9wID09PSAwXG4gICAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgICA6IGRlbHRhID4gMCAmJiBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodFxuICAgICAgICAgIClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBkZWx0YSA8IDAgJiYgZWwuc2Nyb2xsTGVmdCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudFdpZHRoID09PSBlbC5zY3JvbGxXaWR0aFxuICAgICAgICAgIClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlU2Nyb2xsIChlKSB7XG4gIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICAvLyByZXF1aXJlZCwgb3RoZXJ3aXNlIGlPUyBibG9ja3MgZnVydGhlciBzY3JvbGxpbmdcbiAgICAvLyB1bnRpbCB0aGUgbW9iaWxlIHNjcm9sbGJhciBkaXNzYXBwZWFyc1xuICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uQXBwbGVSZXNpemUgKGV2dCkge1xuICBpZiAodnBQZW5kaW5nVXBkYXRlID09PSB0cnVlKSByZXR1cm5cblxuICB2cFBlbmRpbmdVcGRhdGUgPSB0cnVlXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICB2cFBlbmRpbmdVcGRhdGUgPSBmYWxzZVxuXG4gICAgY29uc3RcbiAgICAgIHsgaGVpZ2h0IH0gPSBldnQudGFyZ2V0LFxuICAgICAgeyBjbGllbnRIZWlnaHQsIHNjcm9sbFRvcCB9ID0gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudFxuXG4gICAgaWYgKG1heFNjcm9sbFRvcCA9PT0gdm9pZCAwIHx8IGhlaWdodCAhPT0gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICBtYXhTY3JvbGxUb3AgPSBjbGllbnRIZWlnaHQgLSBoZWlnaHRcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+IG1heFNjcm9sbFRvcCkge1xuICAgICAgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3AgLT0gTWF0aC5jZWlsKChzY3JvbGxUb3AgLSBtYXhTY3JvbGxUb3ApIC8gOClcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFwcGx5IChhY3Rpb24pIHtcbiAgY29uc3RcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcbiAgICBoYXNWaWV3cG9ydCA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydCAhPT0gdm9pZCAwXG5cbiAgaWYgKGFjdGlvbiA9PT0gJ2FkZCcpIHtcbiAgICBjb25zdCB7IG92ZXJmbG93WSwgb3ZlcmZsb3dYIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2R5KVxuXG4gICAgc2Nyb2xsUG9zaXRpb25YID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKHdpbmRvdylcbiAgICBzY3JvbGxQb3NpdGlvblkgPSBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKHdpbmRvdylcbiAgICBib2R5TGVmdCA9IGJvZHkuc3R5bGUubGVmdFxuICAgIGJvZHlUb3AgPSBib2R5LnN0eWxlLnRvcFxuXG4gICAgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWCB9cHhgXG4gICAgYm9keS5zdHlsZS50b3AgPSBgLSR7IHNjcm9sbFBvc2l0aW9uWSB9cHhgXG5cbiAgICBpZiAob3ZlcmZsb3dYICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbFdpZHRoID4gd2luZG93LmlubmVyV2lkdGgpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIH1cbiAgICBpZiAob3ZlcmZsb3dZICE9PSAnaGlkZGVuJyAmJiAob3ZlcmZsb3dZID09PSAnc2Nyb2xsJyB8fCBib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkpIHtcbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gdHJ1ZVxuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVNjcm9sbCwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY2xpZW50LmlzLmRlc2t0b3AgPT09IHRydWUgJiYgY2xpZW50LmlzLm1hYyA9PT0gdHJ1ZSkge1xuICAgIC8vIHJlZi4gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNy8wMS9zY3JvbGxpbmctaW50ZXJ2ZW50aW9uXG4gICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCd3aGVlbCcsIG9uV2hlZWwsIGxpc3Rlbk9wdHMubm90UGFzc2l2ZSlcbiAgfVxuXG4gIGlmIChhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUpIHtcbiAgICAgIGlmIChoYXNWaWV3cG9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLXByZXZlbnQtc2Nyb2xsJylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXgnKVxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1mb3JjZS1zY3JvbGxiYXIteScpXG5cbiAgICBkb2N1bWVudC5xU2Nyb2xsUHJldmVudGVkID0gZmFsc2VcblxuICAgIGJvZHkuc3R5bGUubGVmdCA9IGJvZHlMZWZ0XG4gICAgYm9keS5zdHlsZS50b3AgPSBib2R5VG9wXG5cbiAgICAvLyBzY3JvbGwgYmFjayBvbmx5IGlmIHJvdXRlIGhhcyBub3QgY2hhbmdlZFxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZiA9PT0gaHJlZikge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWCwgc2Nyb2xsUG9zaXRpb25ZKVxuICAgIH1cblxuICAgIG1heFNjcm9sbFRvcCA9IHZvaWQgMFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSkge1xuICBsZXQgYWN0aW9uID0gJ2FkZCdcblxuICBpZiAoc3RhdGUgPT09IHRydWUpIHtcbiAgICByZWdpc3RlcmVkKytcblxuICAgIGlmIChjbG9zZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcbiAgICAgIGNsb3NlVGltZXIgPSBudWxsXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocmVnaXN0ZXJlZCA+IDEpIHJldHVyblxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChyZWdpc3RlcmVkID09PSAwKSByZXR1cm5cblxuICAgIHJlZ2lzdGVyZWQtLVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAwKSByZXR1cm5cblxuICAgIGFjdGlvbiA9ICdyZW1vdmUnXG5cbiAgICBpZiAoY2xpZW50LmlzLmlvcyA9PT0gdHJ1ZSAmJiBjbGllbnQuaXMubmF0aXZlTW9iaWxlID09PSB0cnVlKSB7XG4gICAgICBjbG9zZVRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChjbG9zZVRpbWVyKVxuICAgICAgY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBhcHBseShhY3Rpb24pXG4gICAgICAgIGNsb3NlVGltZXIgPSBudWxsXG4gICAgICB9LCAxMDApXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBhcHBseShhY3Rpb24pXG59XG4iLCJpbXBvcnQgcHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvcHJldmVudC1zY3JvbGwuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGN1cnJlbnRTdGF0ZVxuXG4gIHJldHVybiB7XG4gICAgcHJldmVudEJvZHlTY3JvbGwgKHN0YXRlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlICE9PSBjdXJyZW50U3RhdGVcbiAgICAgICAgJiYgKGN1cnJlbnRTdGF0ZSAhPT0gdm9pZCAwIHx8IHN0YXRlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgICAgIHByZXZlbnRTY3JvbGwoc3RhdGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGltZW91dChmblssIGRlbGF5XSlcbiAqICAgIHJlbW92ZVRpbWVvdXQoKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpbWVyID0gbnVsbFxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGltZW91dCAoKSB7XG4gICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpbWVvdXQpXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaW1lb3V0KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGltZW91dCxcblxuICAgIHJlZ2lzdGVyVGltZW91dCAoZm4sIGRlbGF5KSB7XG4gICAgICByZW1vdmVUaW1lb3V0KClcblxuICAgICAgaWYgKHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIGZuKClcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJjb25zdCB1bml0cyA9IFsgJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInIF1cblxuZXhwb3J0IGZ1bmN0aW9uIGh1bWFuU3RvcmFnZVNpemUgKGJ5dGVzLCBkZWNpbWFscyA9IDEpIHtcbiAgbGV0IHUgPSAwXG5cbiAgd2hpbGUgKHBhcnNlSW50KGJ5dGVzLCAxMCkgPj0gMTAyNCAmJiB1IDwgdW5pdHMubGVuZ3RoIC0gMSkge1xuICAgIGJ5dGVzIC89IDEwMjRcbiAgICArK3VcbiAgfVxuXG4gIHJldHVybiBgJHsgYnl0ZXMudG9GaXhlZChkZWNpbWFscykgfSR7IHVuaXRzWyB1IF0gfWBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUgKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiZXR3ZWVuICh2LCBtaW4sIG1heCkge1xuICByZXR1cm4gbWF4IDw9IG1pblxuICAgID8gbWluXG4gICAgOiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUb0ludGVydmFsICh2LCBtaW4sIG1heCkge1xuICBpZiAobWF4IDw9IG1pbikge1xuICAgIHJldHVybiBtaW5cbiAgfVxuXG4gIGNvbnN0IHNpemUgPSAobWF4IC0gbWluICsgMSlcblxuICBsZXQgaW5kZXggPSBtaW4gKyAodiAtIG1pbikgJSBzaXplXG4gIGlmIChpbmRleCA8IG1pbikge1xuICAgIGluZGV4ID0gc2l6ZSArIGluZGV4XG4gIH1cblxuICByZXR1cm4gaW5kZXggPT09IDAgPyAwIDogaW5kZXggLy8gZml4IGZvciAoLWEgJSBhKSA9PiAtMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFkICh2LCBsZW5ndGggPSAyLCBjaGFyID0gJzAnKSB7XG4gIGlmICh2ID09PSB2b2lkIDAgfHwgdiA9PT0gbnVsbCkge1xuICAgIHJldHVybiB2XG4gIH1cblxuICBjb25zdCB2YWwgPSAnJyArIHZcbiAgcmV0dXJuIHZhbC5sZW5ndGggPj0gbGVuZ3RoXG4gICAgPyB2YWxcbiAgICA6IG5ldyBBcnJheShsZW5ndGggLSB2YWwubGVuZ3RoICsgMSkuam9pbihjaGFyKSArIHZhbFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh1bWFuU3RvcmFnZVNpemUsXG4gIGNhcGl0YWxpemUsXG4gIGJldHdlZW4sXG4gIG5vcm1hbGl6ZVRvSW50ZXJ2YWwsXG4gIHBhZFxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJZSxTQUFBLFdBQVUsU0FBUyxNQUFNLG1CQUFtQjtBQUN6RCxNQUFJO0FBRUosV0FBUyxvQkFBcUI7QUFDNUIsUUFBSSxpQkFBaUIsUUFBUTtBQUMzQixjQUFRLE9BQU8sWUFBWTtBQUMzQixxQkFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUVBLGtCQUFnQixNQUFNO0FBQ3BCLFlBQVEsVUFBVSxRQUFRLGtCQUFpQjtBQUFBLEVBQzdDLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBRUEsZUFBZ0I7QUFDZCxxQkFBZTtBQUFBLFFBQ2IsV0FBVyxNQUFNLGtCQUFrQixVQUFVO0FBQUEsUUFDN0MsU0FBUztBQUFBLE1BQ2pCO0FBRU0sY0FBUSxJQUFJLFlBQVk7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFDQTtBQzFCTyxNQUFNLHNCQUFzQjtBQUFBLEVBQ2pDLFlBQVk7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUFBO0FBQUEsRUFHWCx1QkFBdUIsQ0FBRSxVQUFVLEtBQU07QUFDM0M7QUFFTyxNQUFNLHNCQUFzQjtBQUFBLEVBQ2pDO0FBQUEsRUFBYztBQUFBLEVBQVE7QUFBQSxFQUFjO0FBQ3RDO0FBSUEsU0FBQSxl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
