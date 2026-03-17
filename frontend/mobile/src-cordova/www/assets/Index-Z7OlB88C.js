import { a as QItemSection, b as QItemLabel, Q as QItem, c as QList } from "./QList-Cqp20mmE.js";
import { c as createComponent, g as getCurrentInstance, w as watch, o as onMounted, a as onBeforeUnmount, h, f as hSlot, Q as QIcon, A as QSpinner, d as hDir, r as ref, j as computed, B as prevent, C as useSizeProps, R as Ripple, D as useSize, E as hMergeSlotSafely, G as stopAndPrevent, H as createDirective, I as cleanEvt, J as client, K as noop, L as addEvt, M as position, N as leftClick, _ as _export_sfc, b as withDirectives, k as openBlock, m as createBlock, p as withCtx, t as createVNode, O as normalizeClass, u as createTextVNode, v as toDisplayString, P as onBeforeMount, q as createElementBlock, F as Fragment, S as createCommentVNode, s as renderList, z as QBtn, x as useRouter } from "./index-D97wSuWx.js";
import { T as TouchPan, c as clearSelection } from "./TouchPan-CTVwpyYX.js";
import { s as scrollTargetProp, g as getScrollTarget, h as getVerticalScrollPosition, f as between } from "./format-DEDBY0uM.js";
import { g as getStateAttributes, a as getPriorityAttributes, f as formatDate, b as getTodoItems, d as deleteTodoItemById, u as useOperationProgress, Q as QPageSticky, c as QDialog, B as Banner, C as ConfirmDialog, U as UI_MESSAGES, e as CONFIRM_MESSAGES, n as notify } from "./Banner-fwpL5tCV.js";
import { Q as QPage } from "./QBanner-B1d7JSmM.js";
import { u as useDarkProps, a as useDark } from "./use-dark-BcG_t4pz.js";
import "./axios-DGUhWzp4.js";
const PULLER_HEIGHT = 40, OFFSET_TOP = 20;
const QPullToRefresh = createComponent({
  name: "QPullToRefresh",
  props: {
    color: String,
    bgColor: String,
    icon: String,
    noMouse: Boolean,
    disable: Boolean,
    scrollTarget: scrollTargetProp
  },
  emits: ["refresh"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const state = ref("pull");
    const pullRatio = ref(0);
    const pulling = ref(false);
    const pullPosition = ref(-PULLER_HEIGHT);
    const animating = ref(false);
    const positionCSS = ref({});
    const style = computed(() => ({
      opacity: pullRatio.value,
      transform: `translateY(${pullPosition.value}px) rotate(${pullRatio.value * 360}deg)`
    }));
    const classes = computed(
      () => "q-pull-to-refresh__puller row flex-center" + (animating.value === true ? " q-pull-to-refresh__puller--animating" : "") + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "")
    );
    function pull(event) {
      if (event.isFinal === true) {
        if (pulling.value === true) {
          pulling.value = false;
          if (state.value === "pulled") {
            state.value = "refreshing";
            animateTo({ pos: OFFSET_TOP });
            trigger();
          } else if (state.value === "pull") {
            animateTo({ pos: -PULLER_HEIGHT, ratio: 0 });
          }
        }
        return;
      }
      if (animating.value === true || state.value === "refreshing") {
        return false;
      }
      if (event.isFirst === true) {
        if (getVerticalScrollPosition(localScrollTarget) !== 0 || event.direction !== "down") {
          if (pulling.value === true) {
            pulling.value = false;
            state.value = "pull";
            animateTo({ pos: -PULLER_HEIGHT, ratio: 0 });
          }
          return false;
        }
        pulling.value = true;
        const { top, left } = proxy.$el.getBoundingClientRect();
        positionCSS.value = {
          top: top + "px",
          left: left + "px",
          width: window.getComputedStyle(proxy.$el).getPropertyValue("width")
        };
      }
      prevent(event.evt);
      const distance = Math.min(140, Math.max(0, event.distance.y));
      pullPosition.value = distance - PULLER_HEIGHT;
      pullRatio.value = between(distance / (OFFSET_TOP + PULLER_HEIGHT), 0, 1);
      const newState = pullPosition.value > OFFSET_TOP ? "pulled" : "pull";
      if (state.value !== newState) {
        state.value = newState;
      }
    }
    const directives = computed(() => {
      const modifiers = { down: true };
      if (props.noMouse !== true) {
        modifiers.mouse = true;
      }
      return [[
        TouchPan,
        pull,
        void 0,
        modifiers
      ]];
    });
    const contentClass = computed(
      () => `q-pull-to-refresh__content${pulling.value === true ? " no-pointer-events" : ""}`
    );
    function trigger() {
      emit("refresh", () => {
        animateTo({ pos: -PULLER_HEIGHT, ratio: 0 }, () => {
          state.value = "pull";
        });
      });
    }
    let localScrollTarget, timer = null;
    function animateTo({ pos, ratio }, done) {
      animating.value = true;
      pullPosition.value = pos;
      if (ratio !== void 0) {
        pullRatio.value = ratio;
      }
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        animating.value = false;
        done?.();
      }, 300);
    }
    function updateScrollTarget() {
      localScrollTarget = getScrollTarget(proxy.$el, props.scrollTarget);
    }
    watch(() => props.scrollTarget, updateScrollTarget);
    onMounted(updateScrollTarget);
    onBeforeUnmount(() => {
      timer !== null && clearTimeout(timer);
    });
    Object.assign(proxy, { trigger, updateScrollTarget });
    return () => {
      const child = [
        h("div", { class: contentClass.value }, hSlot(slots.default)),
        h("div", {
          class: "q-pull-to-refresh__puller-container fixed row flex-center no-pointer-events z-top",
          style: positionCSS.value
        }, [
          h("div", {
            class: classes.value,
            style: style.value
          }, [
            state.value !== "refreshing" ? h(QIcon, {
              name: props.icon || $q.iconSet.pullToRefresh.icon,
              color: props.color,
              size: "32px"
            }) : h(QSpinner, {
              size: "24px",
              color: props.color
            })
          ])
        ])
      ];
      return hDir(
        "div",
        { class: "q-pull-to-refresh" },
        child,
        "main",
        props.disable === false,
        () => directives.value
      );
    };
  }
});
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false) return;
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
const TouchHold = createDirective(
  {
    name: "touch-hold",
    beforeMount(el, binding) {
      const { modifiers } = binding;
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      const ctx = {
        handler: binding.value,
        noop,
        mouseStart(evt) {
          if (typeof ctx.handler === "function" && leftClick(evt) === true) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "passiveCapture"],
              [document, "click", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (evt.target !== void 0 && typeof ctx.handler === "function") {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "passiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          ctx.origin = position(evt);
          const startTime = Date.now();
          if (client.is.mobile === true) {
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelay) => {
              ctx.styleCleanup = void 0;
              const remove = () => {
                document.body.classList.remove("non-selectable");
              };
              if (withDelay === true) {
                clearSelection();
                setTimeout(remove, 10);
              } else {
                remove();
              }
            };
          }
          ctx.triggered = false;
          ctx.sensitivity = mouseEvent === true ? ctx.mouseSensitivity : ctx.touchSensitivity;
          ctx.timer = setTimeout(() => {
            ctx.timer = void 0;
            clearSelection();
            ctx.triggered = true;
            ctx.handler({
              evt,
              touch: mouseEvent !== true,
              mouse: mouseEvent === true,
              position: ctx.origin,
              duration: Date.now() - startTime
            });
          }, ctx.duration);
        },
        move(evt) {
          const { top, left } = position(evt);
          if (ctx.timer !== void 0 && (Math.abs(left - ctx.origin.left) >= ctx.sensitivity || Math.abs(top - ctx.origin.top) >= ctx.sensitivity)) {
            clearTimeout(ctx.timer);
            ctx.timer = void 0;
          }
        },
        end(evt) {
          cleanEvt(ctx, "temp");
          ctx.styleCleanup?.(ctx.triggered);
          if (ctx.triggered === true) {
            evt !== void 0 && stopAndPrevent(evt);
          } else if (ctx.timer !== void 0) {
            clearTimeout(ctx.timer);
            ctx.timer = void 0;
          }
        }
      };
      const data = [600, 5, 7];
      if (typeof binding.arg === "string" && binding.arg.length !== 0) {
        binding.arg.split(":").forEach((val, index) => {
          const v = parseInt(val, 10);
          v && (data[index] = v);
        });
      }
      [ctx.duration, ctx.touchSensitivity, ctx.mouseSensitivity] = data;
      el.__qtouchhold = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchend", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, binding) {
      const ctx = el.__qtouchhold;
      if (ctx !== void 0 && binding.oldValue !== binding.value) {
        typeof binding.value !== "function" && ctx.end();
        ctx.handler = binding.value;
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchhold;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        ctx.timer !== void 0 && clearTimeout(ctx.timer);
        ctx.styleCleanup?.();
        delete el.__qtouchhold;
      }
    }
  }
);
const _sfc_main$2 = {
  __name: "TodoItem",
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  emits: ["select", "touchHold"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const stateAttributes = computed(() => {
      return getStateAttributes(props.todoItem.state);
    });
    const priorityAttributes = computed(() => {
      return getPriorityAttributes(props.todoItem.priority);
    });
    const emitSelect = () => {
      emit("select", props.todoItem);
    };
    const emitTouchHold = () => {
      emit("touchHold", props.todoItem);
    };
    const __returned__ = { props, emit, stateAttributes, priorityAttributes, emitSelect, emitTouchHold, get formatDate() {
      return formatDate;
    }, get getPriorityAttributes() {
      return getPriorityAttributes;
    }, get getStateAttributes() {
      return getStateAttributes;
    }, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createBlock(QItem, {
    clickable: "",
    onClick: $setup.emitSelect
  }, {
    default: withCtx(() => [
      createVNode(QItemSection, { avatar: "" }, {
        default: withCtx(() => [
          createVNode(QIcon, {
            color: $setup.stateAttributes.color,
            name: $setup.stateAttributes.icon
          }, null, 8, ["color", "name"])
        ]),
        _: 1
      }),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, {
            class: normalizeClass({ "text-strike": $props.todoItem.state === "DO" })
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.todoItem.text), 1)
            ]),
            _: 1
          }, 8, ["class"]),
          createVNode(QItemLabel, { caption: "" }, {
            default: withCtx(() => [
              createTextVNode("Created at: " + toDisplayString($setup.formatDate($props.todoItem.created)), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QItemSection, { side: "" }, {
        default: withCtx(() => [
          createVNode(QChip, {
            color: $setup.priorityAttributes.color,
            "text-color": "white",
            outline: "",
            square: ""
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.todoItem.priority), 1)
            ]),
            _: 1
          }, 8, ["color"])
        ]),
        _: 1
      })
    ]),
    _: 1
  })), [
    [Ripple],
    [
      TouchHold,
      $setup.emitTouchHold,
      void 0,
      { mouse: true }
    ]
  ]);
}
const TodoItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "TodoItem.vue"]]);
function useTodoItems() {
  const todoItems = ref([]);
  const errorMessage = ref("");
  const { isDone, isRunning } = useOperationProgress();
  const loadTodoItems = async () => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await getTodoItems();
      errorMessage.value = envelope.error || "";
      if (envelope.result) {
        todoItems.value = envelope.result.data;
        todoItems.value.sort((a, b) => b.state.localeCompare(a.state));
      }
    } finally {
      isRunning.value = false;
    }
  };
  const deleteTodoItem = async (id) => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await deleteTodoItemById(id);
      errorMessage.value = envelope.error || "";
      if (!envelope.error) {
        await loadTodoItems();
      }
    } finally {
      isRunning.value = false;
    }
  };
  onBeforeMount(async () => {
    await loadTodoItems();
  });
  return {
    todoItems,
    errorMessage,
    isDone,
    isRunning,
    load: loadTodoItems,
    remove: deleteTodoItem
  };
}
const skeletonTypes = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
];
const skeletonAnimations = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
const QSkeleton = createComponent({
  name: "QSkeleton",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (v) => skeletonTypes.includes(v),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (v) => skeletonAnimations.includes(v),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const style = computed(() => {
      const size = props.size !== void 0 ? [props.size, props.size] : [props.width, props.height];
      return {
        "--q-skeleton-speed": `${props.animationSpeed}ms`,
        width: size[0],
        height: size[1]
      };
    });
    const classes = computed(
      () => `q-skeleton q-skeleton--${isDark.value === true ? "dark" : "light"} q-skeleton--type-${props.type}` + (props.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${props.animation}` : "") + (props.square === true ? " q-skeleton--square" : "") + (props.bordered === true ? " q-skeleton--bordered" : "")
    );
    return () => h(props.tag, {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const _sfc_main$1 = {
  __name: "ListSkeleton",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QItem, null, {
      default: withCtx(() => [
        createVNode(QItemSection, { avatar: "" }, {
          default: withCtx(() => [
            createVNode(QSkeleton, { type: "QAvatar" })
          ]),
          _: 1
        }),
        createVNode(QItemSection, null, {
          default: withCtx(() => [
            createVNode(QItemLabel, null, {
              default: withCtx(() => [
                createVNode(QSkeleton, { type: "text" })
              ]),
              _: 1
            }),
            createVNode(QItemLabel, { caption: "" }, {
              default: withCtx(() => [
                createVNode(QSkeleton, {
                  type: "text",
                  width: "65%"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(QItem, null, {
      default: withCtx(() => [
        createVNode(QItemSection, { avatar: "" }, {
          default: withCtx(() => [
            createVNode(QSkeleton, { type: "QAvatar" })
          ]),
          _: 1
        }),
        createVNode(QItemSection, null, {
          default: withCtx(() => [
            createVNode(QItemLabel, null, {
              default: withCtx(() => [
                createVNode(QSkeleton, { type: "text" })
              ]),
              _: 1
            }),
            createVNode(QItemLabel, { caption: "" }, {
              default: withCtx(() => [
                createVNode(QSkeleton, {
                  type: "text",
                  width: "65%"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(QItem, null, {
      default: withCtx(() => [
        createVNode(QItemSection, { avatar: "" }, {
          default: withCtx(() => [
            createVNode(QSkeleton, { type: "QAvatar" })
          ]),
          _: 1
        }),
        createVNode(QItemSection, null, {
          default: withCtx(() => [
            createVNode(QItemLabel, null, {
              default: withCtx(() => [
                createVNode(QSkeleton, { type: "text" })
              ]),
              _: 1
            }),
            createVNode(QItemLabel, { caption: "" }, {
              default: withCtx(() => [
                createVNode(QSkeleton, {
                  type: "text",
                  width: "65%"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const ListSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ListSkeleton.vue"]]);
const _sfc_main = {
  __name: "Index",
  setup(__props, { expose: __expose }) {
    __expose();
    const $router = useRouter();
    const { todoItems, errorMessage, isDone, isRunning, load, remove } = useTodoItems();
    const deletionDialog = ref(false);
    const selectedTodoItem = ref(null);
    const showError = computed(() => isDone.value && errorMessage.value);
    const showLoading = computed(() => isRunning.value && !errorMessage.value);
    const showContent = computed(() => isDone.value && !errorMessage.value);
    const showEmpty = computed(() => isDone.value && !errorMessage.value && todoItems.value.length === 0);
    const refreshTodoItems = async (done) => {
      await load();
      done();
    };
    const createTodoItem = () => {
      $router.push({ name: "todo-item", params: { id: 0 } });
    };
    const editTodoItem = (todoItem) => {
      $router.push({ name: "todo-item", params: { id: todoItem.id } });
    };
    const openDeletionDialog = (todoItem) => {
      selectedTodoItem.value = todoItem;
      deletionDialog.value = true;
    };
    const deleteTodoItem = async () => {
      await remove(selectedTodoItem.value.id);
      notify(!!errorMessage.value, UI_MESSAGES.DELETED, errorMessage.value);
      selectedTodoItem.value = null;
    };
    const __returned__ = { $router, todoItems, errorMessage, isDone, isRunning, load, remove, deletionDialog, selectedTodoItem, showError, showLoading, showContent, showEmpty, refreshTodoItems, createTodoItem, editTodoItem, openDeletionDialog, deleteTodoItem, computed, ref, TodoItem, get useTodoItems() {
      return useTodoItems;
    }, ConfirmDialog, ListSkeleton, get useRouter() {
      return useRouter;
    }, get notify() {
      return notify;
    }, Banner, get CONFIRM_MESSAGES() {
      return CONFIRM_MESSAGES;
    }, get UI_MESSAGES() {
      return UI_MESSAGES;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createVNode(QPullToRefresh, {
        onRefresh: $setup.refreshTodoItems,
        "scroll-target": "#todo-item-list",
        color: "blue-10"
      }, {
        default: withCtx(() => [
          $setup.showError ? (openBlock(), createBlock($setup["Banner"], {
            key: 0,
            message: $setup.errorMessage,
            "icon-color": "orange-10",
            "icon-name": "sentiment_very_dissatisfied",
            "button-label": "Reload",
            "button-callback": $setup.load
          }, null, 8, ["message", "button-callback"])) : createCommentVNode("", true),
          $setup.showEmpty ? (openBlock(), createBlock($setup["Banner"], {
            key: 1,
            message: $setup.UI_MESSAGES.NO_TODO_ITEMS,
            "icon-name": "info",
            "icon-color": "blue-10"
          }, null, 8, ["message"])) : createCommentVNode("", true),
          $setup.showLoading ? (openBlock(), createBlock($setup["ListSkeleton"], { key: 2 })) : createCommentVNode("", true),
          $setup.showContent ? (openBlock(), createBlock(QList, {
            key: 3,
            separator: "",
            id: "todo-item-list"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.todoItems, (todoItem) => {
                return openBlock(), createBlock($setup["TodoItem"], {
                  key: todoItem.id,
                  "todo-item": todoItem,
                  onTouchHold: $setup.openDeletionDialog,
                  onSelect: $setup.editTodoItem
                }, null, 8, ["todo-item"]);
              }), 128))
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      $setup.showContent ? (openBlock(), createBlock(QPageSticky, {
        key: 0,
        position: "bottom-right",
        offset: [18, 18]
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            fab: "",
            icon: "add",
            color: "blue-10",
            onClick: $setup.createTodoItem
          })
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QDialog, {
        modelValue: $setup.deletionDialog,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.deletionDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode($setup["ConfirmDialog"], {
            icon: "delete",
            "yes-button-callback": $setup.deleteTodoItem,
            message: $setup.CONFIRM_MESSAGES.DELETE_TODO_ITEM($setup.selectedTodoItem?.text)
          }, null, 8, ["message"])
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Index.vue"]]);
export {
  Index as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXgtWjdPbEI4OEMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcHVsbC10by1yZWZyZXNoL1FQdWxsVG9SZWZyZXNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGlwL1FDaGlwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy90b3VjaC1ob2xkL1RvdWNoSG9sZC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RvZG9JdGVtLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb3NhYmxlcy90b2RvSXRlbXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NrZWxldG9uL1FTa2VsZXRvbi5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xpc3RTa2VsZXRvbi52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXgudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuaW1wb3J0IFRvdWNoUGFuIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdG91Y2gtcGFuL1RvdWNoUGFuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBwcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3RcbiAgUFVMTEVSX0hFSUdIVCA9IDQwLFxuICBPRkZTRVRfVE9QID0gMjBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQdWxsVG9SZWZyZXNoJyxcblxuICBwcm9wczoge1xuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgYmdDb2xvcjogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBub01vdXNlOiBCb29sZWFuLFxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHNjcm9sbFRhcmdldFByb3BcbiAgfSxcblxuICBlbWl0czogWyAncmVmcmVzaCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHN0YXRlID0gcmVmKCdwdWxsJylcbiAgICBjb25zdCBwdWxsUmF0aW8gPSByZWYoMClcbiAgICBjb25zdCBwdWxsaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IHB1bGxQb3NpdGlvbiA9IHJlZigtUFVMTEVSX0hFSUdIVClcbiAgICBjb25zdCBhbmltYXRpbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgcG9zaXRpb25DU1MgPSByZWYoe30pXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBvcGFjaXR5OiBwdWxsUmF0aW8udmFsdWUsXG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7IHB1bGxQb3NpdGlvbi52YWx1ZSB9cHgpIHJvdGF0ZSgkeyBwdWxsUmF0aW8udmFsdWUgKiAzNjAgfWRlZylgXG4gICAgfSkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXB1bGwtdG8tcmVmcmVzaF9fcHVsbGVyIHJvdyBmbGV4LWNlbnRlcidcbiAgICAgICsgKGFuaW1hdGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1wdWxsLXRvLXJlZnJlc2hfX3B1bGxlci0tYW5pbWF0aW5nJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gcHVsbCAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChwdWxsaW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcHVsbGluZy52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICBpZiAoc3RhdGUudmFsdWUgPT09ICdwdWxsZWQnKSB7XG4gICAgICAgICAgICBzdGF0ZS52YWx1ZSA9ICdyZWZyZXNoaW5nJ1xuICAgICAgICAgICAgYW5pbWF0ZVRvKHsgcG9zOiBPRkZTRVRfVE9QIH0pXG4gICAgICAgICAgICB0cmlnZ2VyKClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoc3RhdGUudmFsdWUgPT09ICdwdWxsJykge1xuICAgICAgICAgICAgYW5pbWF0ZVRvKHsgcG9zOiAtUFVMTEVSX0hFSUdIVCwgcmF0aW86IDAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGFuaW1hdGluZy52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS52YWx1ZSA9PT0gJ3JlZnJlc2hpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCkgIT09IDAgfHwgZXZlbnQuZGlyZWN0aW9uICE9PSAnZG93bicpIHtcbiAgICAgICAgICBpZiAocHVsbGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHVsbGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgICBzdGF0ZS52YWx1ZSA9ICdwdWxsJ1xuICAgICAgICAgICAgYW5pbWF0ZVRvKHsgcG9zOiAtUFVMTEVSX0hFSUdIVCwgcmF0aW86IDAgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHB1bGxpbmcudmFsdWUgPSB0cnVlXG5cbiAgICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3h5LiRlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBwb3NpdGlvbkNTUy52YWx1ZSA9IHtcbiAgICAgICAgICB0b3A6IHRvcCArICdweCcsXG4gICAgICAgICAgbGVmdDogbGVmdCArICdweCcsXG4gICAgICAgICAgd2lkdGg6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHByb3h5LiRlbCkuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHByZXZlbnQoZXZlbnQuZXZ0KVxuXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGgubWluKDE0MCwgTWF0aC5tYXgoMCwgZXZlbnQuZGlzdGFuY2UueSkpXG4gICAgICBwdWxsUG9zaXRpb24udmFsdWUgPSBkaXN0YW5jZSAtIFBVTExFUl9IRUlHSFRcbiAgICAgIHB1bGxSYXRpby52YWx1ZSA9IGJldHdlZW4oZGlzdGFuY2UgLyAoT0ZGU0VUX1RPUCArIFBVTExFUl9IRUlHSFQpLCAwLCAxKVxuXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHB1bGxQb3NpdGlvbi52YWx1ZSA+IE9GRlNFVF9UT1AgPyAncHVsbGVkJyA6ICdwdWxsJ1xuXG4gICAgICBpZiAoc3RhdGUudmFsdWUgIT09IG5ld1N0YXRlKSB7XG4gICAgICAgIHN0YXRlLnZhbHVlID0gbmV3U3RhdGVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3RpdmVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2VcbiAgICAgIGNvbnN0IG1vZGlmaWVycyA9IHsgZG93bjogdHJ1ZSB9XG5cbiAgICAgIGlmIChwcm9wcy5ub01vdXNlICE9PSB0cnVlKSB7XG4gICAgICAgIG1vZGlmaWVycy5tb3VzZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgcHVsbCxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBtb2RpZmllcnNcbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtcHVsbC10by1yZWZyZXNoX19jb250ZW50JHsgcHVsbGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcgbm8tcG9pbnRlci1ldmVudHMnIDogJycgfWBcbiAgICApXG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyICgpIHtcbiAgICAgIGVtaXQoJ3JlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgIGFuaW1hdGVUbyh7IHBvczogLVBVTExFUl9IRUlHSFQsIHJhdGlvOiAwIH0sICgpID0+IHtcbiAgICAgICAgICBzdGF0ZS52YWx1ZSA9ICdwdWxsJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgbG9jYWxTY3JvbGxUYXJnZXQsIHRpbWVyID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZVRvICh7IHBvcywgcmF0aW8gfSwgZG9uZSkge1xuICAgICAgYW5pbWF0aW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgcHVsbFBvc2l0aW9uLnZhbHVlID0gcG9zXG5cbiAgICAgIGlmIChyYXRpbyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHB1bGxSYXRpby52YWx1ZSA9IHJhdGlvXG4gICAgICB9XG5cbiAgICAgIHRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBhbmltYXRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBkb25lPy4oKVxuICAgICAgfSwgMzAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBsb2NhbFNjcm9sbFRhcmdldCA9IGdldFNjcm9sbFRhcmdldChwcm94eS4kZWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICB9XG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5zY3JvbGxUYXJnZXQsIHVwZGF0ZVNjcm9sbFRhcmdldClcblxuICAgIG9uTW91bnRlZCh1cGRhdGVTY3JvbGxUYXJnZXQpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHRyaWdnZXIsIHVwZGF0ZVNjcm9sbFRhcmdldCB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtcHVsbC10by1yZWZyZXNoX19wdWxsZXItY29udGFpbmVyIGZpeGVkIHJvdyBmbGV4LWNlbnRlciBuby1wb2ludGVyLWV2ZW50cyB6LXRvcCcsXG4gICAgICAgICAgc3R5bGU6IHBvc2l0aW9uQ1NTLnZhbHVlXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIHN0YXRlLnZhbHVlICE9PSAncmVmcmVzaGluZydcbiAgICAgICAgICAgICAgPyBoKFFJY29uLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogcHJvcHMuaWNvbiB8fCAkcS5pY29uU2V0LnB1bGxUb1JlZnJlc2guaWNvbixcbiAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgc2l6ZTogJzMycHgnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogaChRU3Bpbm5lciwge1xuICAgICAgICAgICAgICAgIHNpemU6ICcyNHB4JyxcbiAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3JcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6ICdxLXB1bGwtdG8tcmVmcmVzaCcgfSxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgICdtYWluJyxcbiAgICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UsXG4gICAgICAgICgpID0+IGRpcmVjdGl2ZXMudmFsdWVcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuXG4gICAgICBjb25zdCByZW1vdmUgPSB7XG4gICAgICAgIC4uLmNoaXAsXG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnJlbW92ZUFyaWFMYWJlbCB8fCAkcS5sYW5nLmxhYmVsLnJlbW92ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjaGlwLCByZW1vdmUgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUucmVtb3ZlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uUmVtb3ZlLFxuICAgICAgICAgIG9uS2V5dXA6IG9uUmVtb3ZlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmNoaXAsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgc3RvcEFuZFByZXZlbnQsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtaG9sZCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAndG91Y2gtaG9sZCcsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgYmluZGluZykge1xuICAgICAgICBjb25zdCB7IG1vZGlmaWVycyB9ID0gYmluZGluZ1xuXG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlXG4gICAgICAgICAgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZVxuICAgICAgICApIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBoYW5kbGVyOiBiaW5kaW5nLnZhbHVlLFxuICAgICAgICAgIG5vb3AsXG5cbiAgICAgICAgICBtb3VzZVN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3R4LmhhbmRsZXIgPT09ICdmdW5jdGlvbicgJiYgbGVmdENsaWNrKGV2dCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgYWRkRXZ0KGN0eCwgJ3RlbXAnLCBbXG4gICAgICAgICAgICAgICAgWyBkb2N1bWVudCwgJ21vdXNlbW92ZScsICdtb3ZlJywgJ3Bhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdjbGljaycsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgdG91Y2hTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldCAhPT0gdm9pZCAwICYmIHR5cGVvZiBjdHguaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAncGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgY3R4LnN0YXJ0KGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgICAgY3R4Lm9yaWdpbiA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50LmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB3aXRoRGVsYXkgPT4ge1xuICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB2b2lkIDBcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh3aXRoRGVsYXkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocmVtb3ZlLCAxMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IHJlbW92ZSgpIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHgudHJpZ2dlcmVkID0gZmFsc2VcbiAgICAgICAgICAgIGN0eC5zZW5zaXRpdml0eSA9IG1vdXNlRXZlbnQgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBjdHgubW91c2VTZW5zaXRpdml0eVxuICAgICAgICAgICAgICA6IGN0eC50b3VjaFNlbnNpdGl2aXR5XG5cbiAgICAgICAgICAgIGN0eC50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBjdHgudGltZXIgPSB2b2lkIDBcbiAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICAgICAgICBjdHgudHJpZ2dlcmVkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgIGN0eC5oYW5kbGVyKHtcbiAgICAgICAgICAgICAgICBldnQsXG4gICAgICAgICAgICAgICAgdG91Y2g6IG1vdXNlRXZlbnQgIT09IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGN0eC5vcmlnaW4sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IERhdGUubm93KCkgLSBzdGFydFRpbWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIGN0eC5kdXJhdGlvbilcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gcG9zaXRpb24oZXZ0KVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHgudGltZXIgIT09IHZvaWQgMCAmJiAoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnMobGVmdCAtIGN0eC5vcmlnaW4ubGVmdCkgPj0gY3R4LnNlbnNpdGl2aXR5XG4gICAgICAgICAgICAgICAgfHwgTWF0aC5hYnModG9wIC0gY3R4Lm9yaWdpbi50b3ApID49IGN0eC5zZW5zaXRpdml0eVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGN0eC50aW1lcilcbiAgICAgICAgICAgICAgY3R4LnRpbWVyID0gdm9pZCAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGVuZCAoZXZ0KSB7XG4gICAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgICAgLy8gZGVsYXkgbmVlZGVkIG90aGVyd2lzZSBzZWxlY3Rpb24gc3RpbGwgb2NjdXJzXG4gICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwPy4oY3R4LnRyaWdnZXJlZClcblxuICAgICAgICAgICAgaWYgKGN0eC50cmlnZ2VyZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4LnRpbWVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGN0eC50aW1lcilcbiAgICAgICAgICAgICAgY3R4LnRpbWVyID0gdm9pZCAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVyYXRpb24gaW4gbXMsIHRvdWNoIGluIHBpeGVscywgbW91c2UgaW4gcGl4ZWxzXG4gICAgICAgIGNvbnN0IGRhdGEgPSBbIDYwMCwgNSwgNyBdXG5cbiAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nLmFyZyA9PT0gJ3N0cmluZycgJiYgYmluZGluZy5hcmcubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgYmluZGluZy5hcmcuc3BsaXQoJzonKS5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQodmFsLCAxMClcbiAgICAgICAgICAgIHYgJiYgKGRhdGFbIGluZGV4IF0gPSB2KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBbIGN0eC5kdXJhdGlvbiwgY3R4LnRvdWNoU2Vuc2l0aXZpdHksIGN0eC5tb3VzZVNlbnNpdGl2aXR5IF0gPSBkYXRhXG5cbiAgICAgICAgZWwuX19xdG91Y2hob2xkID0gY3R4XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgY29uc3QgY2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgfHwgbW9kaWZpZXJzLm1vdXNlY2FwdHVyZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyAnQ2FwdHVyZSdcbiAgICAgICAgICAgIDogJydcblxuICAgICAgICAgIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgICAgWyBlbCwgJ21vdXNlZG93bicsICdtb3VzZVN0YXJ0JywgYHBhc3NpdmUkeyBjYXB0dXJlIH1gIF1cbiAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpZW50Lmhhcy50b3VjaCA9PT0gdHJ1ZSAmJiBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICBbIGVsLCAndG91Y2hzdGFydCcsICd0b3VjaFN0YXJ0JywgYHBhc3NpdmUkeyBtb2RpZmllcnMuY2FwdHVyZSA9PT0gdHJ1ZSA/ICdDYXB0dXJlJyA6ICcnIH1gIF0sXG4gICAgICAgICAgWyBlbCwgJ3RvdWNoZW5kJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoaG9sZFxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCAmJiBiaW5kaW5nLm9sZFZhbHVlICE9PSBiaW5kaW5nLnZhbHVlKSB7XG4gICAgICAgICAgdHlwZW9mIGJpbmRpbmcudmFsdWUgIT09ICdmdW5jdGlvbicgJiYgY3R4LmVuZCgpXG4gICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5nLnZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoaG9sZFxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuXG4gICAgICAgICAgY3R4LnRpbWVyICE9PSB2b2lkIDAgJiYgY2xlYXJUaW1lb3V0KGN0eC50aW1lcilcbiAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwPy4oKVxuXG4gICAgICAgICAgZGVsZXRlIGVsLl9fcXRvdWNoaG9sZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxuICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlIEBjbGljaz1cImVtaXRTZWxlY3RcIiB2LXRvdWNoLWhvbGQubW91c2U9XCJlbWl0VG91Y2hIb2xkXCI+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICA8cS1pY29uIDpjb2xvcj1cInN0YXRlQXR0cmlidXRlcy5jb2xvclwiIDpuYW1lPVwic3RhdGVBdHRyaWJ1dGVzLmljb25cIi8+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgOmNsYXNzPVwieyd0ZXh0LXN0cmlrZScgOiB0b2RvSXRlbS5zdGF0ZSA9PT0gJ0RPJ31cIj57eyB0b2RvSXRlbS50ZXh0IH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+Q3JlYXRlZCBhdDoge3sgZm9ybWF0RGF0ZSh0b2RvSXRlbS5jcmVhdGVkKSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgIDxxLWNoaXAgOmNvbG9yPVwicHJpb3JpdHlBdHRyaWJ1dGVzLmNvbG9yXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgb3V0bGluZSBzcXVhcmU+XG4gICAgICAgICAgICAgICAge3sgdG9kb0l0ZW0ucHJpb3JpdHkgfX1cbiAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbi8qKlxuICogQ3VzdG9tIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSB0b2RvIGl0ZW0gYXMgYSBsaXN0IGl0ZW1cbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSAnc3JjL3V0aWxzL2Zvcm1hdHRlcidcbmltcG9ydCB7Z2V0UHJpb3JpdHlBdHRyaWJ1dGVzLCBnZXRTdGF0ZUF0dHJpYnV0ZXN9IGZyb20gJ3NyYy91dGlscy9kaWN0aW9uYXJ5J1xuaW1wb3J0IHtjb21wdXRlZH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgICB0b2RvSXRlbToge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxufSk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbXCJzZWxlY3RcIiwgXCJ0b3VjaEhvbGRcIl0pO1xuXG5jb25zdCBzdGF0ZUF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgcmV0dXJuIGdldFN0YXRlQXR0cmlidXRlcyhwcm9wcy50b2RvSXRlbS5zdGF0ZSk7XG59KVxuY29uc3QgcHJpb3JpdHlBdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBnZXRQcmlvcml0eUF0dHJpYnV0ZXMocHJvcHMudG9kb0l0ZW0ucHJpb3JpdHkpO1xufSlcblxuLyoqXG4gKiBTZW5kcyB0aGUgY3VzdG9tIGV2ZW50IFNlbGVjdCB0byBhIHBhcmVudCBjb21wb25lbnRcbiAqL1xuY29uc3QgZW1pdFNlbGVjdCA9ICgpID0+IHtcbiAgICBlbWl0KFwic2VsZWN0XCIsIHByb3BzLnRvZG9JdGVtKTtcbn1cblxuLyoqXG4gKiBTZW5kcyB0aGUgY3VzdG9tIGV2ZW50IHRvdWNoSG9sZCB0byBhIHBhcmVudCBjb21wb25lbnRcbiAqL1xuY29uc3QgZW1pdFRvdWNoSG9sZCA9ICgpID0+IHtcbiAgICBlbWl0KFwidG91Y2hIb2xkXCIsIHByb3BzLnRvZG9JdGVtKTtcbn1cbjwvc2NyaXB0PlxuIiwiLyoqXG4gKiBDb21wb3NhYmxlIHVzZVRvZG9JdGVtcygpXG4gKiBFbmNhcHN1bGF0ZXMgc3RhdGUgYW5kIGxvZ2ljIG5lZWRlZCB0byBtYW5pcHVsYXRlIHRvZG8gaXRlbXMuXG4gKiBAY29weXJpZ2h0IEFsYXNrYSBTb2Z0d2FyZSBJbmMuIChjKSAyMDI2LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbmltcG9ydCB7b25CZWZvcmVNb3VudCwgcmVmfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQge3VzZU9wZXJhdGlvblByb2dyZXNzfSBmcm9tIFwic3JjL2NvbXBvc2FibGVzL29wZXJhdGlvblByb2dyZXNzLmpzXCI7XG5pbXBvcnQgKiBhcyBkYXRhU2VydmljZSBmcm9tIFwic3JjL3NlcnZpY2VzL2RhdGFTZXJ2aWNlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUb2RvSXRlbXMoKSB7XG4gICAgY29uc3QgdG9kb0l0ZW1zID0gcmVmKFtdKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSByZWYoXCJcIik7XG4gICAgY29uc3Qge2lzRG9uZSwgaXNSdW5uaW5nfSA9IHVzZU9wZXJhdGlvblByb2dyZXNzKCk7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhbGwgdG9kbyBpdGVtcyBmcm9tIHRoZSBiYWNrZW5kXG4gICAgICovXG4gICAgY29uc3QgbG9hZFRvZG9JdGVtcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaXNSdW5uaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gXCJcIjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW52ZWxvcGUgPSBhd2FpdCBkYXRhU2VydmljZS5nZXRUb2RvSXRlbXMoKTtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZS52YWx1ZSA9IGVudmVsb3BlLmVycm9yIHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGlmIChlbnZlbG9wZS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0b2RvSXRlbXMudmFsdWUgPSBlbnZlbG9wZS5yZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICB0b2RvSXRlbXMudmFsdWUuc29ydCgoYSwgYikgPT4gYi5zdGF0ZS5sb2NhbGVDb21wYXJlKGEuc3RhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlzUnVubmluZy52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHRvZG8gaXRlbSBieSBpZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIFRoZSBpZCBvZiB0aGUgdG9kbyBpdGVtIHRvIGRlbGV0ZVxuICAgICAqL1xuICAgIGNvbnN0IGRlbGV0ZVRvZG9JdGVtID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgICAgIGlzUnVubmluZy52YWx1ZSA9IHRydWU7XG4gICAgICAgIGVycm9yTWVzc2FnZS52YWx1ZSA9IFwiXCI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGVudmVsb3BlID0gYXdhaXQgZGF0YVNlcnZpY2UuZGVsZXRlVG9kb0l0ZW1CeUlkKGlkKTtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZS52YWx1ZSA9IGVudmVsb3BlLmVycm9yIHx8IFwiXCI7XG5cbiAgICAgICAgICAgIC8vIElmIGRlbGV0aW9uIHdhcyBzdWNjZXNzZnVsLCByZWxvYWQgdGhlIGxpc3RcbiAgICAgICAgICAgIGlmICghZW52ZWxvcGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkVG9kb0l0ZW1zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpc1J1bm5pbmcudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG9uQmVmb3JlTW91bnQgaXMgYSBWdWUgbGlmZWN5Y2xlIGhvb2sgdGhhdCBydW5zIGJlZm9yZSB0aGUgY29tcG9uZW50J3MgRE9NIGlzIGNyZWF0ZWRcbiAgICBvbkJlZm9yZU1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbG9hZFRvZG9JdGVtcygpO1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2RvSXRlbXMsXG4gICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgaXNEb25lLFxuICAgICAgICBpc1J1bm5pbmcsXG4gICAgICAgIGxvYWQ6IGxvYWRUb2RvSXRlbXMsXG4gICAgICAgIHJlbW92ZTogZGVsZXRlVG9kb0l0ZW1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IHNrZWxldG9uVHlwZXMgPSBbXG4gICd0ZXh0JywgJ3JlY3QnLCAnY2lyY2xlJyxcbiAgJ1FCdG4nLCAnUUJhZGdlJywgJ1FDaGlwJywgJ1FUb29sYmFyJyxcbiAgJ1FDaGVja2JveCcsICdRUmFkaW8nLCAnUVRvZ2dsZScsXG4gICdRU2xpZGVyJywgJ1FSYW5nZScsICdRSW5wdXQnLFxuICAnUUF2YXRhcidcbl1cblxuZXhwb3J0IGNvbnN0IHNrZWxldG9uQW5pbWF0aW9ucyA9IFtcbiAgJ3dhdmUnLCAncHVsc2UnLCAncHVsc2UteCcsICdwdWxzZS15JywgJ2ZhZGUnLCAnYmxpbmsnLCAnbm9uZSdcbl1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTa2VsZXRvbicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBza2VsZXRvblR5cGVzLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3JlY3QnXG4gICAgfSxcblxuICAgIGFuaW1hdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHNrZWxldG9uQW5pbWF0aW9ucy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICd3YXZlJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uU3BlZWQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDE1MDBcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuXG4gICAgc2l6ZTogU3RyaW5nLFxuICAgIHdpZHRoOiBTdHJpbmcsXG4gICAgaGVpZ2h0OiBTdHJpbmdcbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgc2l6ZSA9IHByb3BzLnNpemUgIT09IHZvaWQgMFxuICAgICAgICA/IFsgcHJvcHMuc2l6ZSwgcHJvcHMuc2l6ZSBdXG4gICAgICAgIDogWyBwcm9wcy53aWR0aCwgcHJvcHMuaGVpZ2h0IF1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJy0tcS1za2VsZXRvbi1zcGVlZCc6IGAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXNgLFxuICAgICAgICB3aWR0aDogc2l6ZVsgMCBdLFxuICAgICAgICBoZWlnaHQ6IHNpemVbIDEgXVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXNrZWxldG9uIHEtc2tlbGV0b24tLSR7IGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICdkYXJrJyA6ICdsaWdodCcgfSBxLXNrZWxldG9uLS10eXBlLSR7IHByb3BzLnR5cGUgfWBcbiAgICAgICsgKHByb3BzLmFuaW1hdGlvbiAhPT0gJ25vbmUnID8gYCBxLXNrZWxldG9uLS1hbmltIHEtc2tlbGV0b24tLWFuaW0tJHsgcHJvcHMuYW5pbWF0aW9uIH1gIDogJycpXG4gICAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtc2tlbGV0b24tLXNxdWFyZScgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLXNrZWxldG9uLS1ib3JkZXJlZCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gICAgPHEtaXRlbT5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJRQXZhdGFyXCIvPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIi8+XG4gICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNjUlXCIvPlxuICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgPC9xLWl0ZW0+XG5cbiAgICA8cS1pdGVtPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cIlFBdmF0YXJcIi8+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiLz5cbiAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI2NSVcIi8+XG4gICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8L3EtaXRlbT5cblxuICAgIDxxLWl0ZW0+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwiUUF2YXRhclwiLz5cbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIvPlxuICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjY1JVwiLz5cbiAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgIDwvcS1pdGVtPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBDdXN0b20gY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGxpc3QgcGxhY2Vob2xkZXJcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxxLXBhZ2UgcGFkZGluZz5cbiAgICAgICAgPHEtcHVsbC10by1yZWZyZXNoXG4gICAgICAgICAgICBAcmVmcmVzaD1cInJlZnJlc2hUb2RvSXRlbXNcIlxuICAgICAgICAgICAgc2Nyb2xsLXRhcmdldD1cIiN0b2RvLWl0ZW0tbGlzdFwiXG4gICAgICAgICAgICBjb2xvcj1cImJsdWUtMTBcIj5cblxuICAgICAgICAgICAgPGJhbm5lciB2LWlmPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICAgICAgICAgICAgOm1lc3NhZ2U9XCJlcnJvck1lc3NhZ2VcIiA6aWNvbi1jb2xvcj1cIidvcmFuZ2UtMTAnXCIgOmljb24tbmFtZT1cIidzZW50aW1lbnRfdmVyeV9kaXNzYXRpc2ZpZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgOmJ1dHRvbi1sYWJlbD1cIidSZWxvYWQnXCIgOmJ1dHRvbi1jYWxsYmFjaz1cImxvYWRcIi8+XG5cbiAgICAgICAgICAgIDxiYW5uZXIgdi1pZj1cInNob3dFbXB0eVwiXG4gICAgICAgICAgICAgICAgICAgIDptZXNzYWdlPVwiVUlfTUVTU0FHRVMuTk9fVE9ET19JVEVNU1wiIDppY29uLW5hbWU9XCInaW5mbydcIiA6aWNvbi1jb2xvcj1cIidibHVlLTEwJ1wiLz5cblxuICAgICAgICAgICAgPGxpc3Qtc2tlbGV0b24gdi1pZj1cInNob3dMb2FkaW5nXCI+PC9saXN0LXNrZWxldG9uPlxuXG4gICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvciBpZD1cInRvZG8taXRlbS1saXN0XCIgdi1pZj1cInNob3dDb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPHRvZG8taXRlbVxuICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInRvZG9JdGVtIGluIHRvZG9JdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgIDprZXk9XCJ0b2RvSXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgIDp0b2RvLWl0ZW09XCJ0b2RvSXRlbVwiXG4gICAgICAgICAgICAgICAgICAgIEB0b3VjaC1ob2xkPVwib3BlbkRlbGV0aW9uRGlhbG9nXCJcbiAgICAgICAgICAgICAgICAgICAgQHNlbGVjdD1cImVkaXRUb2RvSXRlbVwiLz5cbiAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3EtcHVsbC10by1yZWZyZXNoPlxuXG4gICAgICAgIDwhLS0gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0byBjcmVhdGUgYSBuZXcgdG9kbyBpdGVtIC0tPlxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiIDpvZmZzZXQ9XCJbMTgsIDE4XVwiIHYtaWY9XCJzaG93Q29udGVudFwiPlxuICAgICAgICAgICAgPHEtYnRuIGZhYiBpY29uPVwiYWRkXCIgY29sb3I9XCJibHVlLTEwXCIgQGNsaWNrPVwiY3JlYXRlVG9kb0l0ZW1cIi8+XG4gICAgICAgIDwvcS1wYWdlLXN0aWNreT5cblxuICAgICAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRlbGV0aW9uRGlhbG9nXCI+XG4gICAgICAgICAgICA8Y29uZmlybS1kaWFsb2cgOmljb249XCInZGVsZXRlJ1wiIDp5ZXMtYnV0dG9uLWNhbGxiYWNrPVwiZGVsZXRlVG9kb0l0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptZXNzYWdlPVwiQ09ORklSTV9NRVNTQUdFUy5ERUxFVEVfVE9ET19JVEVNKHNlbGVjdGVkVG9kb0l0ZW0/LnRleHQpXCIvPlxuICAgICAgICA8L3EtZGlhbG9nPlxuICAgIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbi8qKlxuICogSW5kZXggcGFnZVxuICogU2hvd3MgYSB0b2RvIGl0ZW0gbGlzdC4gVXNlcnMgY2FuIHJlZnJlc2ggYSB0b2RvIGl0ZW0gbGlzdCwgZGVsZXRlIGEgdG9kbyBpdGVtIGFzIHdlbGwgYXMgY3JlYXRlIGEgbmV3IG9uZS5cbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0IHtjb21wdXRlZCwgcmVmfSBmcm9tICd2dWUnO1xuaW1wb3J0IFRvZG9JdGVtIGZyb20gJ3NyYy9jb21wb25lbnRzL1RvZG9JdGVtLnZ1ZSdcbmltcG9ydCB7dXNlVG9kb0l0ZW1zfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdG9kb0l0ZW1zJ1xuaW1wb3J0IENvbmZpcm1EaWFsb2cgZnJvbSAnc3JjL2NvbXBvbmVudHMvQ29uZmlybURpYWxvZy52dWUnXG5pbXBvcnQgTGlzdFNrZWxldG9uIGZyb20gJ3NyYy9jb21wb25lbnRzL0xpc3RTa2VsZXRvbi52dWUnXG5pbXBvcnQge3VzZVJvdXRlcn0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7bm90aWZ5fSBmcm9tICdzcmMvdXRpbHMvbm90aWZ5J1xuaW1wb3J0IEJhbm5lciBmcm9tIFwic3JjL2NvbXBvbmVudHMvQmFubmVyLnZ1ZVwiO1xuaW1wb3J0IHtDT05GSVJNX01FU1NBR0VTLCBVSV9NRVNTQUdFU30gZnJvbSAnc3JjL2NvbnN0YW50cy9tZXNzYWdlcyc7XG5cbmNvbnN0ICRyb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbmNvbnN0IHt0b2RvSXRlbXMsIGVycm9yTWVzc2FnZSwgaXNEb25lLCBpc1J1bm5pbmcsIGxvYWQsIHJlbW92ZX0gPSB1c2VUb2RvSXRlbXMoKTtcbmNvbnN0IGRlbGV0aW9uRGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHNlbGVjdGVkVG9kb0l0ZW0gPSByZWYobnVsbCk7XG5cbi8vIENvbXB1dGVkIHByb3BlcnRpZXMgZm9yIGNsZWFyZXIgdGVtcGxhdGUgY29uZGl0aW9uc1xuY29uc3Qgc2hvd0Vycm9yID0gY29tcHV0ZWQoKCkgPT4gaXNEb25lLnZhbHVlICYmIGVycm9yTWVzc2FnZS52YWx1ZSk7XG5jb25zdCBzaG93TG9hZGluZyA9IGNvbXB1dGVkKCgpID0+IGlzUnVubmluZy52YWx1ZSAmJiAhZXJyb3JNZXNzYWdlLnZhbHVlKTtcbmNvbnN0IHNob3dDb250ZW50ID0gY29tcHV0ZWQoKCkgPT4gaXNEb25lLnZhbHVlICYmICFlcnJvck1lc3NhZ2UudmFsdWUpO1xuY29uc3Qgc2hvd0VtcHR5ID0gY29tcHV0ZWQoKCkgPT4gaXNEb25lLnZhbHVlICYmICFlcnJvck1lc3NhZ2UudmFsdWUgJiYgdG9kb0l0ZW1zLnZhbHVlLmxlbmd0aCA9PT0gMCk7XG5cbi8qKlxuICogVGhlIG1ldGhvZCBjYWxscyBsb2FkaW5nIHRvZG8gaXRlbXMgZnJvbSB0aGUgY29tcG9zYWJsZSB1c2VUb2RvSXRlbXMoKS4gSXQgaXMgdHJpZ2dlcmVkIG9uIHB1bGwgZG93biBnZXN0dXJlLlxuICogQHBhcmFtIGRvbmUgLSBwdWxsLXRvLXJlZnJlc2ggY29tcG9uZW50J3MgY2FsbGJhY2sgb24gZmluaXNoZWQgbG9hZGluZ1xuICovXG5jb25zdCByZWZyZXNoVG9kb0l0ZW1zID0gYXN5bmMgKGRvbmUpID0+IHtcbiAgICBhd2FpdCBsb2FkKCk7XG4gICAgZG9uZSgpO1xufVxuXG4vKipcbiAqIE5hdmlnYXRlcyB0byB0aGUgcGFnZSBUb2RvSXRlbSwgd2hlcmUgYSBuZXcgdG9kbyBpdGVtIGNhbiBiZSBzYXZlZFxuICovXG5jb25zdCBjcmVhdGVUb2RvSXRlbSA9ICgpID0+IHtcbiAgICAkcm91dGVyLnB1c2goe25hbWU6IFwidG9kby1pdGVtXCIsIHBhcmFtczoge2lkOiAwfX0pO1xufVxuXG4vKipcbiAqIE5hdmlnYXRlcyB0byB0aGUgcGFnZSBUb2RvSXRlbSwgd2hlcmUgYSBwYXNzZWQgdG9kbyBpdGVtIGNhbiBiZSBtb2RpZmllZFxuICogQHBhcmFtIHRvZG9JdGVtIHRvZG8gaXRlbSB0byBtb2RpZnlcbiAqL1xuY29uc3QgZWRpdFRvZG9JdGVtID0gKHRvZG9JdGVtKSA9PiB7XG4gICAgJHJvdXRlci5wdXNoKHtuYW1lOiBcInRvZG8taXRlbVwiLCBwYXJhbXM6IHtpZDogdG9kb0l0ZW0uaWR9fSlcbn1cblxuLyoqXG4gKiBPcGVucyB0aGUgZGVsZXRpb24gZGlhbG9nIGZvciBhIHBhc3NlZCB0b2RvIGl0ZW0uXG4gKiBAcGFyYW0gdG9kb0l0ZW0gdG9kbyBpdGVtIHRvIGRlbGV0ZVxuICovXG5jb25zdCBvcGVuRGVsZXRpb25EaWFsb2cgPSAodG9kb0l0ZW0pID0+IHtcbiAgICBzZWxlY3RlZFRvZG9JdGVtLnZhbHVlID0gdG9kb0l0ZW07XG4gICAgZGVsZXRpb25EaWFsb2cudmFsdWUgPSB0cnVlO1xufVxuXG4vKipcbiAqIENhbGxzIGRlbGV0aW9uIGZyb20gdGhlIGNvbXBvc2FibGUgdXNlVG9kb0l0ZW1zKClcbiAqIGFuZCBub3RpZmllcyBhIHVzZXIgd2hldGhlciB0aGUgb3BlcmF0aW9uIGlzIHN1Y2Nlc3NmdWwgb3Igbm90XG4gKi9cbmNvbnN0IGRlbGV0ZVRvZG9JdGVtID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlbW92ZShzZWxlY3RlZFRvZG9JdGVtLnZhbHVlLmlkKTtcbiAgICBub3RpZnkoISFlcnJvck1lc3NhZ2UudmFsdWUsIFVJX01FU1NBR0VTLkRFTEVURUQsIGVycm9yTWVzc2FnZS52YWx1ZSk7XG4gICAgc2VsZWN0ZWRUb2RvSXRlbS52YWx1ZSA9IG51bGw7XG59XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsImRhdGFTZXJ2aWNlLmdldFRvZG9JdGVtcyIsImRhdGFTZXJ2aWNlLmRlbGV0ZVRvZG9JdGVtQnlJZCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFZQSxNQUNFLGdCQUFnQixJQUNoQixhQUFhO0FBRWYsTUFBQSxpQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFFVCxjQUFjO0FBQUEsRUFDbEI7QUFBQSxFQUVFLE9BQU8sQ0FBRSxTQUFTO0FBQUEsRUFFbEIsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE1BQUssSUFBSyxtQkFBa0I7QUFDcEMsVUFBTSxFQUFFLEdBQUUsSUFBSztBQUVmLFVBQU0sUUFBUSxJQUFJLE1BQU07QUFDeEIsVUFBTSxZQUFZLElBQUksQ0FBQztBQUN2QixVQUFNLFVBQVUsSUFBSSxLQUFLO0FBQ3pCLFVBQU0sZUFBZSxJQUFJLENBQUMsYUFBYTtBQUN2QyxVQUFNLFlBQVksSUFBSSxLQUFLO0FBQzNCLFVBQU0sY0FBYyxJQUFJLENBQUEsQ0FBRTtBQUUxQixVQUFNLFFBQVEsU0FBUyxPQUFPO0FBQUEsTUFDNUIsU0FBUyxVQUFVO0FBQUEsTUFDbkIsV0FBVyxjQUFlLGFBQWEsS0FBSyxjQUFnQixVQUFVLFFBQVE7SUFDcEYsRUFBTTtBQUVGLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsK0NBQ0csVUFBVSxVQUFVLE9BQU8sMENBQTBDLE9BQ3JFLE1BQU0sWUFBWSxTQUFTLE9BQVEsTUFBTSxPQUFPLEtBQU07QUFBQSxJQUMvRDtBQUVJLGFBQVMsS0FBTSxPQUFPO0FBQ3BCLFVBQUksTUFBTSxZQUFZLE1BQU07QUFDMUIsWUFBSSxR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
