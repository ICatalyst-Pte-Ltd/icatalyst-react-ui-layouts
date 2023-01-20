import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useMouse, useWebsockets, Container, Icon, Avatar, TextField, IconButton, useLayoutSelector, useContextPanelSelector, ContextPanel, LocalizationContext, Footer, Link, Image, useAuthorisation, TitleBar, Navbar, useMessageSelector, Snackbar, ACTIONS, useApplication, findModule, useLocalization, useHookWithRefCallback, useBreakpoint, StateDialog, useObservable, useEffectOnce, EntityViewForm, Loader, RepositoryTable, SectionHeader, useApplicationRepository, Page, ErrorWrapper, WebContainer } from '@icatalyst/react-ui-components';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, forwardRef, useContext, createContext } from 'react';
import { useNavigate, Outlet, useParams, Routes, Route } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { tinycolor, moment, randomColor, _, mostReadable } from '@icatalyst/js-core';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Typography, AppBar, Toolbar, Badge, Tooltip, Link as Link$1 } from '@mui/material';

function _arrayLikeToArray$8(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$8(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$e(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit$8(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$8() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$e(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$e(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$e(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$e(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$e(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray$8(arr, i) {
    return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8();
}
function _unsupportedIterableToArray$8(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
var useStyles$k = makeStyles()(function(theme) {
    return {
        root: {
            position: "relative"
        },
        userAvatar: {
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            transition: theme.transitions.create([
                "top",
                "left"
            ], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter
            })
        }
    };
});
function UserAvatar(param) {
    var displayName = param.displayName, location = param.location;
    var _useStyles = useStyles$k(), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsxs("div", {
        className: cx(classes.userAvatar),
        style: {
            top: location.y,
            left: location.x
        },
        children: [
            /*#__PURE__*/ jsx(Icon, {
                size: "small",
                children: "north_west"
            }),
            /*#__PURE__*/ jsx(Typography, {
                variant: "caption",
                children: displayName
            })
        ]
    });
}
function MultiUserCanvas(param) {
    var className = param.className, style = param.style, classesProp = param.classes, host = param.host, namespace = param.namespace, _param_debounce = param.debounce, debounce = _param_debounce === void 0 ? 200 : _param_debounce;
    var _useStyles = useStyles$k(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var _useState = _slicedToArray$8(useState("Unknown User"), 2), displayName = _useState[0]; _useState[1];
    var _useState1 = _slicedToArray$8(useState({}), 2), users = _useState1[0], setUsers = _useState1[1];
    var containerRef = useRef(null);
    var handleWSEvent = function(event, data) {
        var type = data.type, socketID = data.socketID, payload = data.payload, displayName = data.displayName;
        switch(type){
            case "mousemove":
                setUsers(function(users) {
                    return _objectSpreadProps$e(_objectSpread$e({}, users), _defineProperty$e({}, socketID, _objectSpreadProps$e(_objectSpread$e({}, users[socketID] || {}), {
                        displayName: displayName,
                        location: {
                            x: payload.offsetX,
                            y: payload.offsetY
                        }
                    })));
                });
                break;
            default:
                console.log(event, {
                    data: data
                });
                break;
        }
    };
    var handleUserConnectedEvent = function(event, data) {
        setUsers(function(users) {
            return _objectSpreadProps$e(_objectSpread$e({}, users), _defineProperty$e({}, data.socketID, {
                displayName: displayName,
                location: {
                    x: 0,
                    y: 0
                }
            }));
        });
    };
    var handleUserDisconnectedEvent = function(event, data) {
        setUsers(function(users) {
            delete users[data.socketID];
            return users;
        });
    };
    var handleConnectEvent = function(event, data) {
        emitEvent("user", {
            namespace: namespace,
            username: "a user name"
        });
    };
    var _useMouse = useMouse(containerRef, {
        debounce: debounce
    }), offsetX = _useMouse.offsetX, offsetY = _useMouse.offsetY;
    var _useWebsockets = useWebsockets(host, namespace, {
        connect: handleConnectEvent,
        disconnect: handleWSEvent,
        connect_error: handleWSEvent,
        room: handleWSEvent,
        user: handleWSEvent,
        message: handleWSEvent,
        user_connected: handleUserConnectedEvent,
        user_disconnected: handleUserDisconnectedEvent
    }), connected = _useWebsockets.connected, emitEvent = _useWebsockets.emitEvent, socketID = _useWebsockets.socketID, error = _useWebsockets.error;
    useEffect(function() {
        if (connected) {
            emitEvent("message", {
                type: "mousemove",
                message: "",
                displayName: displayName,
                payload: {
                    offsetX: offsetX,
                    offsetY: offsetY
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        connected,
        offsetX,
        offsetY
    ]);
    return /*#__PURE__*/ jsxs(Container, {
        ref: containerRef,
        className: cx(classes.root, className),
        style: style,
        children: [
            /*#__PURE__*/ jsxs(Typography, {
                color: connected ? "green" : "error",
                children: [
                    connected ? "Connected" : "Not Connected",
                    " ",
                    "SocketID: ".concat(socketID)
                ]
            }),
            /*#__PURE__*/ jsx(Typography, {
                color: "error",
                children: error
            }),
            Object.entries(users).map(function(param) {
                var _param = _slicedToArray$8(param, 2), socketID = _param[0], userInfo = _param[1];
                return /*#__PURE__*/ jsx(UserAvatar, {
                    displayName: userInfo.displayName,
                    location: userInfo.location
                }, socketID);
            })
        ]
    });
}

var useStyles$j = makeStyles()(function(theme, param) {
    var color = param.color;
    var userColor = tinycolor(color).setAlpha(0.075).toHex8String();
    var textColor = theme.palette.text.primary;
    return {
        root: {
            width: "100%"
        },
        header: {
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        text: {
            borderRadius: theme.shape.borderRadius,
            marginBottom: theme.spacing(1),
            backgroundColor: userColor,
            padding: theme.spacing(1),
            marginRight: theme.spacing(4),
            textAlign: "left",
            color: textColor
        },
        textLocal: {
            marginRight: 0,
            marginLeft: theme.spacing(4),
            textAlign: "right"
        },
        avatar: {
            marginRight: theme.spacing(1),
            flexShrink: 0,
            border: "2px solid ".concat(userColor)
        },
        displayName: {
            fontWeight: "bold",
            flexShrink: 1,
            flexGrow: 1
        },
        time: {
            flexShrink: 0
        }
    };
});
function UserMessage(param) {
    var className = param.className, style = param.style, classesProp = param.classes, message = param.message;
    var formatTime = function formatTime(time) {
        return moment(time).fromNow();
    };
    var _useStyles = useStyles$j({
        color: message.user.color
    }, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsxs("div", {
        className: cx(classes.root, className),
        style: style,
        children: [
            /*#__PURE__*/ jsxs("div", {
                className: cx(classes.header),
                children: [
                    /*#__PURE__*/ jsx(Avatar, {
                        className: cx(classes.avatar),
                        title: message.user.displayName,
                        src: message.user.avatar,
                        size: "small",
                        backgroundColor: tinycolor(message.user.color).toHex8String()
                    }),
                    /*#__PURE__*/ jsx(Typography, {
                        className: cx(classes.displayName),
                        variant: "caption",
                        noWrap: true,
                        children: message.user.displayName
                    }),
                    /*#__PURE__*/ jsx(Typography, {
                        variant: "caption",
                        className: cx(classes.time),
                        color: "secondaryText",
                        noWrap: true,
                        children: formatTime(message.timestamp)
                    })
                ]
            }),
            /*#__PURE__*/ jsx("div", {
                className: cx(classes.text, message.local && classes.textLocal),
                children: message.message
            })
        ]
    });
}

function _arrayLikeToArray$7(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$7(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles$2(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$7(arr);
}
function _defineProperty$d(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArray$2(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit$7(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$7() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread$2() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$d(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$d(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$d(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$d(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$d(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray$7(arr, i) {
    return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7();
}
function _toConsumableArray$2(arr) {
    return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$7(arr) || _nonIterableSpread$2();
}
function _unsupportedIterableToArray$7(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
var useStyles$i = makeStyles()(function(theme) {
    return {
        root: {
            width: theme.spacing(33),
            borderRadius: theme.shape.borderRadius,
            borderWidth: "thin",
            borderColor: theme.palette.divider,
            borderStyle: "solid",
            background: theme.palette.background.paper
        },
        toolbarTitle: {
            marginLeft: theme.spacing(2)
        },
        divider: {
            flexGrow: 1,
            height: "100%"
        },
        contentWrapper: {
            width: "100%",
            height: theme.spacing(48),
            maxHeight: 0,
            transition: theme.transitions.create([
                "max-height"
            ], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter
            }),
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
        },
        contentWrapperExpanded: {
            maxHeight: theme.spacing(100)
        },
        messages: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(2),
            flexGrow: 1,
            overflow: "auto"
        },
        input: {
            flexShrink: 0
        }
    };
});
function Chat(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_open = param.open, open = _param_open === void 0 ? false : _param_open, host = param.host, namespace = param.namespace;
    var handleWSEvent = function handleWSEvent(event, data) {
        var type = data.type;
        switch(type){
            case "message":
                setMessages(function(messages) {
                    return _toConsumableArray$2(messages).concat(_toConsumableArray$2(data));
                });
                break;
            default:
                console.log(event, {
                    data: data
                });
                break;
        }
    };
    var sendMessage = function sendMessage(message) {
        var emitMessage = {
            type: "message",
            message: message,
            timestamp: Date.now(),
            user: _objectSpread$d({}, user)
        };
        setMessages(function(messages) {
            return _toConsumableArray$2(messages).concat([
                _objectSpreadProps$d(_objectSpread$d({}, emitMessage), {
                    local: true
                })
            ]);
        });
        emitEvent("message", emitMessage);
    };
    var handleClearableClicked = function handleClearableClicked() {
        sendMessage(message);
        setMessage("");
    };
    var _useStyles = useStyles$i(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var _useState = _slicedToArray$7(useState(open), 2), isOpen = _useState[0], setIsOpen = _useState[1];
    var _useState1 = _slicedToArray$7(useState(""), 2), message = _useState1[0], setMessage = _useState1[1];
    var _useState2 = _slicedToArray$7(useState([]), 2), messages = _useState2[0], setMessages = _useState2[1];
    var _useState3 = _slicedToArray$7(useState(0), 2), notifications = _useState3[0], setNotifications = _useState3[1];
    var messagesRef = useRef(null);
    var _useState4 = _slicedToArray$7(useState({}), 2); _useState4[0]; var setUsers = _useState4[1];
    var _useState5 = _slicedToArray$7(useState({
        id: "my id",
        displayName: "Display Name",
        avatar: "",
        color: randomColor().toHex8String()
    }), 2), user = _useState5[0]; _useState5[1];
    var handleConnectEvent = function(event, data) {
        emitEvent("user", {
            namespace: namespace,
            user: user
        });
    };
    var handleUserConnectedEvent = function(event, data) {
        setUsers(function(users) {
            return _objectSpreadProps$d(_objectSpread$d({}, users), _defineProperty$d({}, data.socketID, data));
        });
    };
    var handleUserDisconnectedEvent = function(event, data) {
        setUsers(function(users) {
            delete users[data.socketID];
            return users;
        });
    };
    var _useWebsockets = useWebsockets(host, namespace, {
        connect: handleConnectEvent,
        disconnect: handleWSEvent,
        connect_error: handleWSEvent,
        room: handleWSEvent,
        user: handleWSEvent,
        message: handleWSEvent,
        user_connected: handleUserConnectedEvent,
        user_disconnected: handleUserDisconnectedEvent
    }), connected = _useWebsockets.connected, emitEvent = _useWebsockets.emitEvent;
    useEffect(function() {
        setIsOpen(open);
    }, [
        open
    ]);
    useEffect(function() {
        if (!isOpen) {
            setNotifications(function(notifications) {
                return notifications + 1;
            });
        }
    }, [
        messages.length
    ]);
    useLayoutEffect(function() {
        setTimeout(function() {
            if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }, 10);
    }, [
        messages.length
    ]);
    return /*#__PURE__*/ jsxs("div", {
        className: cx(classes.root, className),
        style: style,
        children: [
            /*#__PURE__*/ jsxs("div", {
                className: cx(classes.contentWrapper, isOpen && classes.contentWrapperExpanded),
                children: [
                    /*#__PURE__*/ jsx("div", {
                        className: cx(classes.messages),
                        ref: messagesRef,
                        children: messages.map(function(m) {
                            return /*#__PURE__*/ jsx(UserMessage, {
                                message: m
                            }, m.timestamp);
                        })
                    }),
                    /*#__PURE__*/ jsx("div", {
                        className: cx(classes.input),
                        children: /*#__PURE__*/ jsx(TextField, {
                            disabled: !connected,
                            size: "small",
                            placeholder: "Enter your message...",
                            icon: "message",
                            value: message,
                            clearable: true,
                            clearableIcon: "forward_to_inbox",
                            onChange: function(e, value) {
                                setMessage(value || "");
                            },
                            onClearableClick: handleClearableClicked,
                            onKeyDown: function(e) {
                                if (e.code === "Enter") {
                                    handleClearableClicked();
                                }
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx(AppBar, {
                position: "relative",
                color: "secondary",
                children: /*#__PURE__*/ jsxs(Toolbar, {
                    variant: "dense",
                    children: [
                        /*#__PURE__*/ jsx(Badge, {
                            badgeContent: notifications,
                            color: "success",
                            variant: "dot",
                            children: /*#__PURE__*/ jsx(Icon, {
                                size: "small",
                                children: "chat_bubble"
                            })
                        }),
                        /*#__PURE__*/ jsx(Typography, {
                            className: cx(classes.toolbarTitle),
                            variant: "caption",
                            children: "Chat"
                        }),
                        /*#__PURE__*/ jsx("div", {
                            className: cx(classes.divider)
                        }),
                        /*#__PURE__*/ jsx(IconButton, {
                            color: "inherit",
                            size: "small",
                            icon: isOpen ? "expand_more" : "expand_less",
                            onClick: function() {
                                setNotifications(0);
                                setIsOpen(function(open) {
                                    return !open;
                                });
                            }
                        })
                    ]
                })
            })
        ]
    });
}

/**
 * The useLayoutDefinition hook makes it easier to manage the layout configuration by
 * managing and resolving any user defined overrides for a specific layout
 * @param defaults the default settings for the layout.  Any user overrides are merged with this
 * @returns the resolved layout and a function to set overrides for the user
 */ function useLayoutDefinition(defaults) {
    var name = defaults.name;
    // Check if we have a matching definition in the store
    var currentLayoutSettings = useLayoutSelector(name);
    var resolvedLayout = useMemo(function() {
        return _.merge({}, defaults, currentLayoutSettings);
    }, [
        currentLayoutSettings,
        defaults
    ]);
    var setLayoutOverrides = useCallback(function(overrides) {
        console.log("set overrides on app state");
    }, []);
    return [
        resolvedLayout,
        setLayoutOverrides
    ];
}

function _defineProperty$c(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$c(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$c(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$c(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$c(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$c(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$8(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$8(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$8(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function AppContextPanel(props) {
    var _panelRef_current;
    var _useContextPanelSelector = useContextPanelSelector(), children = _useContextPanelSelector.children, contextProps = _objectWithoutProperties$8(_useContextPanelSelector, [
        "children"
    ]);
    var panelRef = useRef(null);
    return /*#__PURE__*/ jsx(ContextPanel, _objectSpreadProps$c(_objectSpread$c({
        ref: panelRef
    }, props, contextProps), {
        PaperProps: {
            style: {
                position: "absolute"
            }
        },
        BackdropProps: {
            style: {
                position: "absolute"
            }
        },
        ModalProps: {
            container: panelRef === null || panelRef === void 0 ? void 0 : (_panelRef_current = panelRef.current) === null || _panelRef_current === void 0 ? void 0 : _panelRef_current.parentNode,
            style: {
                position: "absolute"
            },
            keepMounted: true
        },
        children: children
    }));
}

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
var defaultImage = img;

function _defineProperty$b(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$b(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$b(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$b(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$b(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$b(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$7(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$7(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$7(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles$h = makeStyles()(function(theme) {
    return {
        root: {
            display: "relative",
            zIndex: 10,
            color: theme.palette.secondary.contrastText,
            background: theme.palette.secondary.main
        },
        titleContent: {
            display: "flex",
            flexDirection: "row"
        },
        toolbar: {},
        link: {
            marginRight: theme.spacing(2)
        },
        linkImage: {
            height: theme.spacing(3),
            width: theme.spacing(3)
        },
        linkText: {
            marginLeft: theme.spacing(2)
        },
        linkIcon: {},
        contentText: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }
    };
});
var AppFooter = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, organisationInfo = _param.organisationInfo, _param_showOrganisationInfo = _param.showOrganisationInfo, showOrganisationInfo = _param_showOrganisationInfo === void 0 ? true : _param_showOrganisationInfo, _param_showFooterInfo = _param.showFooterInfo, showFooterInfo = _param_showFooterInfo === void 0 ? true : _param_showFooterInfo, rest = _objectWithoutProperties$7(_param, [
        "className",
        "style",
        "classes",
        "organisationInfo",
        "showOrganisationInfo",
        "showFooterInfo"
    ]);
    var t = useContext(LocalizationContext).t;
    var _useStyles = useStyles$h(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var name = organisationInfo.name, url = organisationInfo.url, logo = organisationInfo.logo, author = organisationInfo.author;
    var footerContent = t("\xa9{0} {1}, All Rights Reserved.", new Date().getFullYear(), author);
    return /*#__PURE__*/ jsx(Footer, _objectSpreadProps$b(_objectSpread$b({
        ref: ref,
        className: cx(classes.root, className),
        style: style,
        position: "relative"
    }, rest), {
        titleContent: /*#__PURE__*/ jsxs("div", {
            className: cx(classes.titleContent),
            children: [
                showOrganisationInfo && /*#__PURE__*/ jsxs(Link, {
                    className: cx(classes.link),
                    href: url,
                    target: "_blank",
                    classes: {
                        icon: cx(classes.linkIcon)
                    },
                    children: [
                        /*#__PURE__*/ jsx(Image, {
                            className: cx(classes.linkImage),
                            defaultSrc: defaultImage,
                            alt: "".concat(name, " Logo"),
                            src: logo
                        }),
                        /*#__PURE__*/ jsx(Typography, {
                            variant: "caption",
                            className: cx(classes.linkText),
                            children: name
                        })
                    ]
                }),
                showFooterInfo && /*#__PURE__*/ jsx(Typography, {
                    variant: "caption",
                    className: cx(classes.contentText),
                    noWrap: true,
                    children: footerContent
                })
            ]
        })
    }));
});
var AppFooter$1 = AppFooter;

function _defineProperty$a(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$a(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$a(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$a(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$a(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$a(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$6(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$6(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$6(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles$g = makeStyles()(function(theme) {
    return {
        root: {
            color: theme.palette.primary.contrastText
        },
        navMenuWrapper: {
            width: "100%",
            flexGrow: 1,
            overflow: "auto",
            display: "flex"
        }
    };
});
function filterRoutes(checkRoles) {
    var routes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return routes.filter(function(r) {
        return !r.auth || checkRoles(r.auth);
    }).map(function(r) {
        if (r.routes) {
            return _objectSpreadProps$a(_objectSpread$a({}, r), {
                routes: filterRoutes(checkRoles, r.routes)
            });
        } else {
            return r;
        }
    });
}
var AppNavbar = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, _param_folded = _param.folded, folded = _param_folded === void 0 ? false : _param_folded, TitleBarProps = _param.TitleBarProps, PaperProps = _param.PaperProps, _param_showTitleBar = _param.showTitleBar, showTitleBar = _param_showTitleBar === void 0 ? true : _param_showTitleBar, HeaderComponent = _param.HeaderComponent, _param_HeaderComponentProps = _param.HeaderComponentProps, HeaderComponentProps = _param_HeaderComponentProps === void 0 ? {} : _param_HeaderComponentProps, children = _param.children, routes = _param.routes, rest = _objectWithoutProperties$6(_param, [
        "className",
        "style",
        "classes",
        "folded",
        "TitleBarProps",
        "PaperProps",
        "showTitleBar",
        "HeaderComponent",
        "HeaderComponentProps",
        "children",
        "routes"
    ]);
    var _panelRef_current;
    var panelRef = useRef(null);
    var _useStyles = useStyles$g(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var _useAuthorisation = useAuthorisation(); _useAuthorisation.auth; var isInRole = _useAuthorisation.isInRole;
    useEffect(function() {
        if (!panelRef || !ref) {
            return;
        }
        if (typeof ref === "function") {
            ref(panelRef.current);
        } else {
            ref.current = panelRef.current;
        }
    }, [
        panelRef,
        ref
    ]);
    var Header = useMemo(function() {
        return !HeaderComponent ? null : /*#__PURE__*/ jsx(HeaderComponent, _objectSpread$a({}, HeaderComponentProps));
    }, [
        HeaderComponent,
        HeaderComponentProps
    ]);
    // Filter the routes based on the user roles
    var authorisedRoutes = useMemo(function() {
        return filterRoutes(isInRole, routes);
    }, [
        routes,
        isInRole
    ]);
    return /*#__PURE__*/ jsxs(ContextPanel, _objectSpreadProps$a(_objectSpread$a({
        ref: panelRef,
        className: cx(classes.root, className),
        style: style,
        open: true,
        classes: classes
    }, rest), {
        PaperProps: _objectSpreadProps$a(_objectSpread$a({}, PaperProps), {
            style: _objectSpreadProps$a(_objectSpread$a({}, PaperProps === null || PaperProps === void 0 ? void 0 : PaperProps.style), {
                position: "absolute",
                border: 0
            })
        }),
        BackdropProps: {
            style: {
                position: "absolute"
            }
        },
        ModalProps: {
            container: panelRef === null || panelRef === void 0 ? void 0 : (_panelRef_current = panelRef.current) === null || _panelRef_current === void 0 ? void 0 : _panelRef_current.parentElement,
            style: {
                position: "absolute"
            },
            keepMounted: true
        },
        variant: "permanent",
        children: [
            showTitleBar && /*#__PURE__*/ jsx(TitleBar, _objectSpreadProps$a(_objectSpread$a({}, TitleBarProps), {
                position: "relative",
                enableColorOnDark: true
            })),
            Header,
            /*#__PURE__*/ jsx("div", {
                className: cx(classes.navMenuWrapper),
                children: /*#__PURE__*/ jsx(Navbar, {
                    routes: authorisedRoutes,
                    orientation: "vertical",
                    showLabel: !folded,
                    showIconButton: !folded
                })
            }),
            children
        ]
    }));
});
var AppNavbar$1 = AppNavbar;

function _defineProperty$9(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$9(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$9(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$9(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$9(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$9(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function AppSnackbar(props) {
    var contextProps = useMessageSelector();
    var dispatch = useDispatch();
    return /*#__PURE__*/ jsx(Snackbar, _objectSpreadProps$9(_objectSpread$9({}, props, contextProps), {
        onClose: function() {
            dispatch(ACTIONS.message.hideMessage());
        }
    }));
}

function _defineProperty$8(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$8(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$8(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$8(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$8(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$8(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$5(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$5(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$5(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles$f = makeStyles()(function(theme) {
    return {
        root: {
            display: "relative",
            zIndex: 10,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary
        }
    };
});
var AppToolbar = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, rest = _objectWithoutProperties$5(_param, [
        "className",
        "style",
        "classes"
    ]);
    var _useStyles = useStyles$f(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsx(TitleBar, _objectSpreadProps$8(_objectSpread$8({
        ref: ref,
        className: cx(classes.root, className),
        style: style
    }, rest), {
        position: "relative"
    }));
});
var AppToolbar$1 = AppToolbar;

var useStyles$e = makeStyles()(function(theme) {
    return {
        root: {
            minHeight: theme.spacing(2),
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - ".concat(theme.spacing(2), ")"),
            overflow: "hidden",
            textTransform: "capitalize"
        },
        roleList: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            margin: 0,
            fontSize: theme.typography.caption.fontSize
        },
        roleItem: {
            listStyle: "none",
            textTransform: "capitalize"
        }
    };
});
function UserRoles(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_roles = param.roles, roles = _param_roles === void 0 ? [] : _param_roles;
    var _useStyles = useStyles$e(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsx(Tooltip, {
        title: roles.length > 1 ? /*#__PURE__*/ jsx("ul", {
            className: cx(classes.roleList),
            children: roles.map(function(role) {
                return /*#__PURE__*/ jsx("li", {
                    className: cx(classes.roleItem),
                    children: role.name
                }, role.id);
            })
        }) : "",
        children: /*#__PURE__*/ jsx(Typography, {
            className: cx(classes.root, className),
            style: style,
            variant: "caption",
            children: roles.length > 0 && (roles.length === 1 ? roles[0].name : roles[0].name + " + " + (roles.length - 1))
        })
    });
}

var useStyles$d = makeStyles()(function(theme) {
    var avatarSize = theme.spacing(11);
    var avatarSizeFolded = theme.spacing(8);
    return {
        root: {
            background: theme.palette.secondary.main,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme.palette.primary.contrastText,
            marginBottom: "calc(".concat(avatarSize, "/2)")
        },
        userRoles: {
            opacity: 1 - theme.palette.action.activatedOpacity,
            marginBottom: theme.spacing(2),
            maxWidth: "calc(100% - ".concat(theme.spacing(4), ")"),
            transition: theme.transitions.create([
                "opacity",
                "width",
                "height",
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        hideUserRoles: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0
        },
        displayName: {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - ".concat(theme.spacing(4), ")"),
            opacity: 1,
            height: theme.spacing(3),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(0.5),
            transition: theme.transitions.create([
                "opacity",
                "width",
                "height",
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            textTransform: "capitalize"
        },
        hideDisplayName: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0
        },
        avatarWrapper: {
            position: "relative",
            height: "calc((".concat(avatarSize, "/2) + ").concat(theme.spacing(0.5), ")"),
            transition: theme.transitions.create([
                "height"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        avatarWrapperProfilePath: {
            cursor: "pointer",
            "& .profile-badge": {
                width: 0,
                height: 0,
                opacity: 0,
                right: "25%",
                transition: theme.transitions.create([
                    "opacity",
                    "height",
                    "width",
                    "right"
                ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
            },
            "&:hover .profile-badge": {
                opacity: 1,
                right: "5%",
                width: theme.spacing(4),
                height: theme.spacing(4)
            }
        },
        avatarWrapperMinimal: {
            position: "relative",
            height: "calc(".concat(avatarSizeFolded, "/2)")
        },
        avatar: {
            borderWidth: theme.spacing(1),
            borderColor: theme.palette.background.paper,
            borderStyle: "solid",
            transition: theme.transitions.create([
                "borderWidth"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            "& img": {
                marginLeft: theme.spacing(-1.5),
                marginTop: theme.spacing(-1.5)
            },
            "& svg": {
                marginLeft: theme.spacing(-1.5),
                marginTop: theme.spacing(-1.5)
            }
        },
        avatarMinimal: {
            borderWidth: theme.spacing(0.5)
        },
        avatarSize: {
            width: avatarSize,
            height: avatarSize,
            transition: theme.transitions.create([
                "width",
                "height"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        avatarSizeMinimal: {
            width: avatarSizeFolded,
            height: avatarSizeFolded
        },
        avatarFontSize: {
            fontSize: "calc(".concat(avatarSize, "/2)"),
            lineHeight: avatarSize,
            transition: theme.transitions.create([
                "fontSize"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        avatarFontSizeMinimal: {
            fontSize: "calc(".concat(avatarSizeFolded, " - ").concat(theme.spacing(4), ")")
        },
        editBadge: {
            position: "absolute",
            top: "120%",
            borderRadius: "50%",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            cursor: "pointer",
            overflow: "hidden"
        },
        editBadgeIcon: {
            margin: "0 !important",
            marginTop: "".concat(theme.spacing(0.25), " !important"),
            width: "100%",
            height: "100%"
        }
    };
});
function AppUserInfo(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_minimal = param.minimal, minimal = _param_minimal === void 0 ? false : _param_minimal, displayName = param.displayName, profileImage = param.profileImage, roles = param.roles, profilePath = param.profilePath;
    var _useStyles = useStyles$d(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var theme = useTheme();
    var navigate = useNavigate();
    return /*#__PURE__*/ jsxs("div", {
        className: cx(classes.root, className),
        style: style,
        children: [
            /*#__PURE__*/ jsx(Typography, {
                noWrap: true,
                className: cx(classes.displayName, minimal && classes.hideDisplayName),
                children: displayName
            }),
            /*#__PURE__*/ jsx(UserRoles, {
                className: cx(classes.userRoles, minimal && classes.hideUserRoles),
                roles: roles
            }),
            /*#__PURE__*/ jsxs("div", {
                className: cx(classes.avatarWrapper, minimal && classes.avatarWrapperMinimal, profilePath && classes.avatarWrapperProfilePath),
                onClick: function() {
                    if (profilePath) {
                        navigate(profilePath);
                    }
                },
                children: [
                    /*#__PURE__*/ jsx(Avatar, {
                        className: cx(classes.avatar, minimal && classes.avatarMinimal),
                        size: "large",
                        title: displayName,
                        src: profileImage,
                        backgroundColor: profileImage ? theme.palette.background.paper : theme.palette.getContrastText(theme.palette.background.paper),
                        classes: {
                            sizeFn: cx(classes.avatarSize, minimal && classes.avatarSizeMinimal),
                            imageSizeFn: cx(classes.avatarSize, minimal && classes.avatarSizeMinimal),
                            fontSizeFn: cx(classes.avatarFontSize, minimal && classes.avatarFontSizeMinimal)
                        }
                    }),
                    profilePath && /*#__PURE__*/ jsx("div", {
                        className: cx(classes.editBadge, "profile-badge"),
                        children: /*#__PURE__*/ jsx(Icon, {
                            className: cx(classes.editBadgeIcon),
                            color: "inherit",
                            size: "small",
                            children: "edit"
                        })
                    })
                ]
            })
        ]
    });
}

var useStyles$c = makeStyles()(function(theme) {
    return {
        root: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            transition: theme.transitions.create([
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        avatar: {
            flexShrink: 0
        },
        avatarSize: {
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        avatarImageSize: {
            width: theme.spacing(3),
            height: theme.spacing(3)
        },
        logoText: {
            width: "100%",
            opacity: 1,
            fontSize: 16,
            marginLeft: theme.spacing(2),
            fontWeight: "normal",
            flexShrink: 1,
            transition: theme.transitions.create([
                "width",
                "opacity"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        hideLogoText: {
            opacity: 0,
            width: 0
        }
    };
});
function AppLogo(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_showTitle = param.showTitle, showTitle = _param_showTitle === void 0 ? true : _param_showTitle, title = param.title, logo = param.logo;
    var _mostReadable;
    var _useStyles = useStyles$c(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var theme = useTheme();
    var appLogo = logo || (((_mostReadable = mostReadable(tinycolor(theme.palette.secondary.contrastText), [
        "#fff",
        "#000"
    ], {})) === null || _mostReadable === void 0 ? void 0 : _mostReadable.toHexString()) === "#000000" ? "assets/images/placeholders/image-dark.svg" : "assets/images/placeholders/image-light.svg");
    return /*#__PURE__*/ jsxs("div", {
        className: cx(classes.root, className),
        style: style,
        children: [
            /*#__PURE__*/ jsx(Avatar, {
                title: title,
                size: "medium",
                className: cx(classes.avatar),
                backgroundColor: theme.palette.secondary.contrastText,
                src: appLogo,
                classes: {
                    sizeFn: cx(classes.avatarSize),
                    imageSizeFn: cx(classes.avatarImageSize)
                }
            }),
            /*#__PURE__*/ jsx(Typography, {
                variant: "h1",
                component: "div",
                noWrap: true,
                className: cx(classes.logoText, !showTitle && classes.hideLogoText),
                children: title
            })
        ]
    });
}

var useStyles$b = makeStyles()(function(theme) {
    var outline = theme.palette.text.primary;
    return {
        root: {},
        animated: {
            background: "transparent",
            borderRadius: "50%",
            border: "none",
            height: theme.spacing(4),
            width: theme.spacing(4),
            cursor: "pointer",
            "& .hamburger": {
                fill: outline,
                width: "100%",
                height: "100%"
            },
            "&:hover": {
                background: theme.palette.action.hover
            }
        },
        default: {},
        animated_simple: {
            "& .line": {
                transformOrigin: "center",
                transition: [
                    theme.transitions.create([
                        "y"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                    }),
                    theme.transitions.create([
                        "rotate"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                        delay: theme.transitions.duration.enteringScreen
                    }),
                    theme.transitions.create([
                        "opacity"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: 0,
                        delay: theme.transitions.duration.enteringScreen
                    })
                ].join(", ")
            },
            '&[aria-expanded="false"] .line': {
                transition: [
                    theme.transitions.create([
                        "y"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                        delay: theme.transitions.duration.enteringScreen
                    }),
                    theme.transitions.create([
                        "rotate"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                    }),
                    theme.transitions.create([
                        "opacity"
                    ], {
                        easing: theme.transitions.easing.easeOut,
                        duration: 0,
                        delay: theme.transitions.duration.enteringScreen
                    })
                ].join(", ")
            },
            '&[aria-expanded="true"] :is(.top, .bottom)': {
                y: 45
            },
            '&[aria-expanded="true"] .top': {
                rotate: "45deg"
            },
            '&[aria-expanded="true"] .bottom': {
                rotate: "-45deg"
            },
            '&[aria-expanded="true"] .middle': {
                opacity: 0
            }
        }
    };
});
function NavbarToggleButton(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_folded = param.folded, folded = _param_folded === void 0 ? true : _param_folded, icon = param.icon, title = param.title, icons = param.icons, actionName = param.actionName, ariaControls = param.ariaControls, _param_variant = param.variant, variant = _param_variant === void 0 ? "default" : _param_variant;
    var _useStyles = useStyles$b(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var dispatch = useDispatch();
    var pinIcon = icons.pinIcon, closeIcon = icons.closeIcon;
    icon = icon || (folded ? pinIcon.icon : closeIcon.icon);
    title = title || (folded ? pinIcon.text : closeIcon.text);
    var handleToggle = useCallback(function() {
        dispatch(ACTIONS.settings.setLayoutUserSettings({
            name: actionName,
            navbar: {
                folded: !folded
            }
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        folded
    ]);
    return variant === "default" ? /*#__PURE__*/ jsx(IconButton, {
        className: cx(classes.root, className),
        style: style,
        size: "small",
        title: title,
        icon: icon,
        "aria-controls": ariaControls,
        "aria-expanded": !folded,
        color: "inherit",
        onClick: handleToggle
    }) : /*#__PURE__*/ jsx("button", {
        className: cx(classes.root, classes.animated, classes[variant]),
        "aria-controls": ariaControls,
        "aria-expanded": !folded,
        onClick: handleToggle,
        children: /*#__PURE__*/ jsxs("svg", {
            className: "hamburger",
            viewBox: "0 0 100 100",
            children: [
                /*#__PURE__*/ jsx("rect", {
                    className: "line top",
                    width: "80",
                    height: "10",
                    x: "10",
                    y: "25",
                    rx: "5"
                }),
                /*#__PURE__*/ jsx("rect", {
                    className: "line middle",
                    width: "80",
                    height: "10",
                    x: "10",
                    y: "45",
                    rx: "5"
                }),
                /*#__PURE__*/ jsx("rect", {
                    className: "line bottom",
                    width: "80",
                    height: "10",
                    x: "10",
                    y: "65",
                    rx: "5"
                })
            ]
        })
    });
}

function _arrayLikeToArray$6(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$6(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$7(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit$6(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$6() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$7(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$7(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$7(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$7(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$7(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray$6(arr, i) {
    return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6();
}
function _unsupportedIterableToArray$6(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
var ConsoleLayoutDefaults = {
    name: "console",
    theme: {
        main: "defaultDark",
        navbar: "defaultLight",
        toolbar: "defaultLight",
        footer: "defaultLight",
        panel: "defaultLight",
        dialog: "defaultLight"
    },
    navbar: {
        display: true,
        contentPosition: "outside",
        position: "left",
        width: 280,
        foldedWidth: 64,
        flattenNav: true,
        folded: false,
        header: {
            elevation: 0,
            color: "primary"
        },
        userInfo: {
            allowProfileClick: false
        },
        shadow: 0
    },
    contextPanel: {
        display: true,
        position: "right"
    },
    toolbar: {
        display: true,
        contentPosition: "inside"
    },
    footer: {
        display: true,
        contentPosition: "inside"
    },
    messages: {
        position: {
            vertical: "bottom",
            horizontal: "left"
        }
    }
};
var useStyles$a = makeStyles()(function(defaultTheme, layoutConfig) {
    var navbarPosition = layoutConfig.navbar.position;
    var theme = layoutConfig.mainTheme || defaultTheme;
    var toolbarHeight = layoutConfig.toolbarHeight || 0;
    var footerHeight = layoutConfig.footerHeight || 0;
    var navbarHoverOpen = layoutConfig.navbarHoverOpen || false;
    var isFolded = layoutConfig.navbarResponsive ? !layoutConfig.navbar.folded : layoutConfig.navbar.folded;
    // The width that the navbar should be based on its state
    var navbarIntendedWidth = isFolded ? layoutConfig.navbar.foldedWidth : layoutConfig.navbar.width;
    // The actual width of the navbar based on hover and device type
    var navbarActualWidth = isFolded ? navbarHoverOpen ? layoutConfig.navbar.width : layoutConfig.navbar.foldedWidth : layoutConfig.navbar.width;
    var navbarBreakpoint = "lg";
    return {
        root: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
        },
        appWrapper: // Larger screens the navbar is displayed
        _defineProperty$7({
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            flexGrow: 1,
            flexShrink: 0,
            transition: theme.transitions.create([
                "margin",
                "width"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            // Tablet or mobile the navbar is hidden
            width: "100%",
            marginLeft: 0,
            marginRight: 0
        }, theme.breakpoints.up(navbarBreakpoint), {
            width: "calc(100% - ".concat(navbarIntendedWidth, "px)"),
            marginLeft: navbarPosition === "left" ? "".concat(navbarIntendedWidth, "px") : undefined,
            marginRight: navbarPosition === "right" ? "".concat(navbarIntendedWidth, "px") : undefined
        }),
        contentWrapper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            flexShrink: 1,
            overflow: "hidden"
        },
        contentWrapper_toolbarOutside: {
            maxHeight: "calc(100% - ".concat(theme.spacing(8), ")")
        },
        appNavbar: {
            "& .MuiDrawer-paper": // Larger screens the navbar is displayed
            _defineProperty$7({
                boxSizing: "border-box",
                transition: theme.transitions.create([
                    "width"
                ], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                }),
                // Tablet or mobile the navbar is hidden
                width: "".concat(navbarActualWidth === layoutConfig.navbar.foldedWidth ? 0 : navbarActualWidth, "px")
            }, theme.breakpoints.up(navbarBreakpoint), {
                width: "".concat(navbarActualWidth, "px")
            })
        },
        appPanelClipped: {
            marginTop: toolbarHeight,
            marginBottom: footerHeight
        },
        appBarOverlay: {
            zIndex: theme.zIndex.drawer + 1
        },
        appToolbar: {
            display: "flex",
            flexDirection: "row",
            flexShrink: 0
        },
        appToolbar_outside: {
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
            "& .MuiToolbar-root": {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2)
            }
        },
        appToolbar_inside: {},
        appFooter: {
            display: "flex",
            flexDirection: "row",
            flexShrink: 0
        },
        appToolbarTitle_outside: {
            width: "calc(".concat(layoutConfig.navbar.width, "px - ").concat(theme.spacing(2), ")"),
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "space-between"
        },
        navbarToggleButton_outside: {
            flexShrink: 0,
            flexGrow: 0
        },
        appLogo_outside: {
            flexShrink: 1,
            flexGrow: 1,
            maxWidth: "calc(".concat(layoutConfig.navbar.width, "px - ").concat(theme.spacing(8), ")")
        },
        appFooter_outside: {
            maxWidth: "calc(".concat(layoutConfig.navbar.width, "px - ").concat(theme.spacing(4), ")")
        },
        appFooter_inside: {},
        toolbar: {
            transition: theme.transitions.create([
                "padding"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        navbarToolbar: {
            paddingRight: theme.spacing(2)
        },
        footerToolbar: {
            paddingLeft: 0
        },
        footerToolbarFolded: {},
        footerToolbarLink: // Larger screens the navbar is displayed
        _defineProperty$7({
            transition: theme.transitions.create([
                "padding",
                "width"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            overflow: "hidden",
            paddingLeft: theme.spacing(3),
            // Tablet or mobile the navbar is hidden
            width: "".concat(navbarActualWidth === layoutConfig.navbar.foldedWidth ? 0 : navbarActualWidth, "px")
        }, theme.breakpoints.up(navbarBreakpoint), {
            width: "".concat(navbarActualWidth, "px")
        }),
        footerToolbarLinkFolded: {
            paddingLeft: "calc((".concat(navbarActualWidth, "px - ").concat(theme.spacing(3), ") /2)")
        },
        footerToolbarLinkText: {
            transition: theme.transitions.create([
                "opacity",
                "width",
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            opacity: 1,
            maxHeight: theme.spacing(3)
        },
        footerToolbarLinkTextFolded: {
            opacity: 0,
            width: 0,
            flexShrink: 1,
            marginLeft: 0
        },
        footerToolbarLinkIcon: {
            transition: theme.transitions.create([
                "opacity",
                "width",
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            opacity: 1,
            maxHeight: theme.spacing(3)
        },
        footerToolbarLinkIconFolded: {
            opacity: 0,
            width: 0,
            flexShrink: 1,
            marginLeft: 0
        },
        copyrightText: {
            transition: theme.transitions.create([
                "margin"
            ], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        copyrightTextFolded: {
            marginLeft: theme.spacing(0)
        },
        contentNavbarToggle: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1)
        }
    };
});
function ConsoleLayout(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_layoutConfig = param.layoutConfig, layoutConfig = _param_layoutConfig === void 0 ? ConsoleLayoutDefaults : _param_layoutConfig;
    var _useLayoutDefinition = _slicedToArray$6(useLayoutDefinition(layoutConfig || ConsoleLayoutDefaults), 1), layoutProps = _useLayoutDefinition[0];
    var _useApplication = useApplication(), _useApplication_themes = _useApplication.themes, themes = _useApplication_themes === void 0 ? {} : _useApplication_themes, config = _useApplication.config, getAuthContext = _useApplication.getAuthContext, routes = _useApplication.routes, modules = _useApplication.modules;
    var auth = getAuthContext().auth;
    var user = auth.user;
    var _useState = _slicedToArray$6(useState(false), 2), navbarHoverOpen = _useState[0], setNavbarHoverOpen = _useState[1];
    var _useState1 = _slicedToArray$6(useState(false), 2), navbarResponsive = _useState1[0], setNavbarResponsive = _useState1[1];
    var profileModule = findModule("profileModule", modules);
    var appNavbarID = "application_navbar";
    var applicationInfo = {
        author: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        url: (config === null || config === void 0 ? void 0 : config.author.url) || "https://icatalyst.com",
        name: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        logo: (config === null || config === void 0 ? void 0 : config.author.logo) || "static/images/logos/logo-shape.png"
    };
    var openText = useLocalization("open");
    var closeText = useLocalization("close");
    var pinText = useLocalization("pin");
    var menuIcon = "menu";
    var toggleIcons = {
        pinIcon: {
            icon: "fa thumbtack",
            text: pinText
        },
        closeIcon: {
            icon: "fa angle-double-left",
            text: closeText
        }
    };
    var _useState2 = _slicedToArray$6(useState({
        toolbar: 0,
        footer: 0
    }), 2), clippedSizes = _useState2[0], setClippedSizes = _useState2[1];
    var _useHookWithRefCallback = _slicedToArray$6(useHookWithRefCallback(function(ref) {
        // Only clip if the footer is displayed and outside
        if (ref && layoutProps && layoutProps.footer.display && layoutProps.footer.contentPosition === "outside") {
            setClippedSizes(function(sizes) {
                return _objectSpreadProps$7(_objectSpread$7({}, sizes), {
                    footer: ref.clientHeight || 0
                });
            });
        }
    }, [
        layoutProps
    ]), 1), footerRef = _useHookWithRefCallback[0];
    var _useHookWithRefCallback1 = _slicedToArray$6(useHookWithRefCallback(function(ref) {
        var _layoutProps_toolbar, _layoutProps_toolbar1;
        // Only clip if the toolbar is displayed and outside
        if (ref && layoutProps && ((_layoutProps_toolbar = layoutProps.toolbar) === null || _layoutProps_toolbar === void 0 ? void 0 : _layoutProps_toolbar.display) && ((_layoutProps_toolbar1 = layoutProps.toolbar) === null || _layoutProps_toolbar1 === void 0 ? void 0 : _layoutProps_toolbar1.contentPosition) === "outside") {
            setClippedSizes(function(sizes) {
                return _objectSpreadProps$7(_objectSpread$7({}, sizes), {
                    toolbar: ref.clientHeight || 0
                });
            });
        }
    }, [
        layoutProps
    ]), 1), toolbarRef = _useHookWithRefCallback1[0];
    var definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
    var _useStyles = useStyles$a(_objectSpreadProps$7(_objectSpread$7({}, layoutProps || ConsoleLayoutDefaults), {
        mainTheme: definedTheme,
        footerHeight: clippedSizes.footer,
        toolbarHeight: clippedSizes.toolbar,
        navbarHoverOpen: navbarHoverOpen,
        navbarResponsive: navbarResponsive
    }), {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var breakpoint = (definedTheme === null || definedTheme === void 0 ? void 0 : definedTheme.breakpoints.values["lg"]) || 400;
    useBreakpoint(function(isLarger) {
        setNavbarResponsive(!isLarger);
    }, breakpoint, [
        breakpoint
    ]);
    if (!layoutProps) {
        return null;
    }
    var toolbar = layoutProps.toolbar, footer = layoutProps.footer, navbar = layoutProps.navbar, contextPanel = layoutProps.contextPanel, theme = layoutProps.theme, messages = layoutProps.messages;
    // Extract modules to render in the toolbar
    var ToolbarModuleActions = toolbar.display && toolbar.actions;
    var isDisplayFolded = (navbarResponsive ? !navbar.folded : navbar.folded) && !navbarHoverOpen;
    return /*#__PURE__*/ jsx(ThemeProvider, {
        theme: themes[theme.main],
        children: /*#__PURE__*/ jsxs("div", {
            className: cx(classes.root, className),
            style: style,
            children: [
                /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.dialog],
                    children: /*#__PURE__*/ jsx(StateDialog, {})
                }),
                /*#__PURE__*/ jsx(AppSnackbar, {
                    anchorOrigin: {
                        vertical: messages.position.vertical,
                        horizontal: messages.position.horizontal
                    }
                }),
                toolbar.display && toolbar.contentPosition === "outside" && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.toolbar],
                    children: /*#__PURE__*/ jsx(AppToolbar$1, {
                        ref: toolbarRef,
                        className: cx(classes.appToolbar, classes.appToolbar_outside, classes.appBarOverlay),
                        color: toolbar.color,
                        elevation: toolbar.elevation,
                        titleContent: /*#__PURE__*/ jsxs("div", {
                            className: cx(classes.appToolbarTitle_outside),
                            children: [
                                /*#__PURE__*/ jsx(AppLogo, {
                                    className: cx(classes.appLogo_outside),
                                    title: (config === null || config === void 0 ? void 0 : config.name) || "",
                                    logo: (config === null || config === void 0 ? void 0 : config.logo) || ""
                                }),
                                /*#__PURE__*/ jsx(NavbarToggleButton, {
                                    variant: "animated_simple",
                                    folded: navbar.folded,
                                    ariaControls: appNavbarID,
                                    className: cx(classes.navbarToggleButton_outside),
                                    icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                                    title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                                    icons: toggleIcons,
                                    actionName: ConsoleLayoutDefaults.name
                                })
                            ]
                        }),
                        actionContent: ToolbarModuleActions ? /*#__PURE__*/ jsx(ToolbarModuleActions, {}) : undefined
                    })
                }),
                navbar.display && navbar.contentPosition === "outside" && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.navbar],
                    children: /*#__PURE__*/ jsx(AppNavbar$1, {
                        id: appNavbarID,
                        position: navbar.position,
                        className: cx(classes.appNavbar),
                        classes: {
                            drawerContent: cx(classes.appPanelClipped)
                        },
                        HeaderComponent: AppUserInfo,
                        HeaderComponentProps: {
                            displayName: user === null || user === void 0 ? void 0 : user.name,
                            profileImage: user === null || user === void 0 ? void 0 : user.profileImage,
                            roles: user === null || user === void 0 ? void 0 : user.roles,
                            minimal: isDisplayFolded,
                            profilePath: navbar.userInfo.allowProfileClick ? profileModule === null || profileModule === void 0 ? void 0 : profileModule.fullPath : null
                        },
                        folded: isDisplayFolded,
                        onMouseEnter: function() {
                            if (navbar.folded && !navbarResponsive) {
                                setNavbarHoverOpen(true);
                            }
                        },
                        onMouseLeave: function() {
                            setNavbarHoverOpen(false);
                        },
                        showTitleBar: !toolbar.display || toolbar.contentPosition !== "outside",
                        TitleBarProps: {
                            color: navbar.header.color,
                            elevation: navbar.header.elevation,
                            titleContent: !toolbar.display || toolbar.contentPosition !== "outside" ? /*#__PURE__*/ jsx(AppLogo, {
                                showTitle: !isDisplayFolded,
                                style: {
                                    marginLeft: isDisplayFolded ? themes[theme.navbar].spacing(2) : 0
                                },
                                title: (config === null || config === void 0 ? void 0 : config.name) || "",
                                logo: (config === null || config === void 0 ? void 0 : config.logo) || ""
                            }) : undefined,
                            actionContent: isDisplayFolded ? undefined : navbarResponsive ? /*#__PURE__*/ jsx(NavbarToggleButton, {
                                ariaControls: appNavbarID,
                                folded: navbar.folded,
                                icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                                title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                                icons: toggleIcons,
                                actionName: ConsoleLayoutDefaults.name
                            }) : /*#__PURE__*/ jsx(NavbarToggleButton, {
                                ariaControls: appNavbarID,
                                folded: navbar.folded,
                                icons: toggleIcons,
                                actionName: ConsoleLayoutDefaults.name
                            }),
                            ToolbarProps: {
                                disableGutters: isDisplayFolded,
                                classes: {
                                    root: cx(classes.toolbar, classes.navbarToolbar)
                                }
                            }
                        },
                        PaperProps: {
                            style: {
                                boxShadow: themes[theme.navbar].shadows[navbar.shadow]
                            }
                        },
                        routes: routes || [],
                        children: footer.display && footer.contentPosition === "inside" && /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.footer],
                            children: /*#__PURE__*/ jsx(AppFooter$1, {
                                className: cx(classes.appFooter, classes.appFooter_inside),
                                ref: footerRef,
                                color: footer.color,
                                elevation: footer.elevation,
                                organisationInfo: applicationInfo,
                                showFooterInfo: false,
                                ToolbarProps: {
                                    classes: {
                                        root: cx(classes.footerToolbar, isDisplayFolded && classes.footerToolbarFolded)
                                    }
                                },
                                classes: {
                                    link: cx(classes.footerToolbarLink, isDisplayFolded && classes.footerToolbarLinkFolded),
                                    linkText: cx(classes.footerToolbarLinkText, isDisplayFolded && classes.footerToolbarLinkTextFolded),
                                    linkIcon: cx(classes.footerToolbarLinkIcon, isDisplayFolded && classes.footerToolbarLinkIconFolded),
                                    contentText: cx(classes.copyrightText, isDisplayFolded && classes.copyrightTextFolded)
                                }
                            })
                        })
                    })
                }),
                /*#__PURE__*/ jsxs("div", {
                    className: cx(classes.appWrapper),
                    children: [
                        toolbar.display && toolbar.contentPosition === "inside" && /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.toolbar],
                            children: /*#__PURE__*/ jsx(AppToolbar$1, {
                                className: cx(classes.appToolbar, classes.appToolbar_inside),
                                ref: toolbarRef,
                                color: toolbar.color,
                                elevation: toolbar.elevation,
                                titleContent: navbarResponsive ? /*#__PURE__*/ jsx(NavbarToggleButton, {
                                    ariaControls: appNavbarID,
                                    folded: navbar.folded,
                                    icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                                    title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                                    icons: toggleIcons,
                                    actionName: ConsoleLayoutDefaults.name
                                }) : undefined,
                                actionContent: ToolbarModuleActions ? /*#__PURE__*/ jsx(ToolbarModuleActions, {}) : undefined
                            })
                        }),
                        /*#__PURE__*/ jsx("div", {
                            className: cx(classes.contentWrapper, toolbar.contentPosition === "outside" && classes.contentWrapper_toolbarOutside),
                            children: /*#__PURE__*/ jsx(ThemeProvider, {
                                theme: themes[theme.main],
                                children: /*#__PURE__*/ jsxs(Fragment, {
                                    children: [
                                        navbarResponsive && !toolbar.display && /*#__PURE__*/ jsx("div", {
                                            children: /*#__PURE__*/ jsx(NavbarToggleButton, {
                                                ariaControls: appNavbarID,
                                                className: cx(classes.contentNavbarToggle),
                                                folded: navbar.folded,
                                                icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                                                title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                                                icons: toggleIcons,
                                                actionName: ConsoleLayoutDefaults.name
                                            })
                                        }),
                                        /*#__PURE__*/ jsx(Outlet, {})
                                    ]
                                })
                            })
                        }),
                        footer.display && footer.contentPosition === "inside" && /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.footer],
                            children: /*#__PURE__*/ jsx(AppFooter$1, {
                                className: cx(classes.appFooter, classes.appFooter_inside),
                                ref: footerRef,
                                color: footer.color,
                                elevation: footer.elevation,
                                organisationInfo: applicationInfo,
                                showOrganisationInfo: false
                            })
                        })
                    ]
                }),
                contextPanel.display && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.panel],
                    children: /*#__PURE__*/ jsx(AppContextPanel, {
                        position: contextPanel.position,
                        classes: {
                            drawerContent: cx(classes.appPanelClipped)
                        }
                    })
                }),
                footer.display && footer.contentPosition === "outside" && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.footer],
                    children: /*#__PURE__*/ jsx(AppFooter$1, {
                        ref: footerRef,
                        className: cx(classes.appFooter, classes.appFooter_outside, classes.appBarOverlay),
                        color: footer.color,
                        elevation: footer.elevation,
                        ToolbarProps: {
                            classes: {
                                root: cx(classes.footerToolbar, isDisplayFolded && classes.footerToolbarFolded)
                            }
                        },
                        classes: {
                            link: cx(classes.footerToolbarLink, isDisplayFolded && classes.footerToolbarLinkFolded),
                            linkText: cx(classes.footerToolbarLinkText, isDisplayFolded && classes.footerToolbarLinkTextFolded),
                            linkIcon: cx(classes.footerToolbarLinkIcon, isDisplayFolded && classes.footerToolbarLinkIconFolded),
                            contentText: cx(classes.copyrightText, isDisplayFolded && classes.copyrightTextFolded)
                        },
                        organisationInfo: applicationInfo
                    })
                })
            ]
        })
    });
}

function _arrayLikeToArray$5(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$5(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$6(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit$5(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$5() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$6(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$6(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$6(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$6(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$6(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray$5(arr, i) {
    return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5();
}
function _unsupportedIterableToArray$5(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
var CoverLayoutDefaults = {
    name: "cover",
    theme: {
        main: "defaultDark",
        content: "defaultLight",
        panel: "defaultLight",
        dialog: "defaultLight",
        footer: "defaultLight"
    },
    background: {
        image: undefined,
        alpha: 0.05,
        fit: "cover",
        position: "center"
    },
    content: {
        elevation: 3
    },
    contextPanel: {
        display: true,
        position: "right"
    },
    messages: {
        position: {
            vertical: "bottom",
            horizontal: "left"
        }
    },
    footer: {
        display: true
    }
};
var useStyles$9 = makeStyles()(function(defaultTheme, layoutConfig) {
    var theme = layoutConfig.mainTheme || defaultTheme;
    return {
        root: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            alignItems: "center",
            padding: 0
        },
        contentArea: _defineProperty$6({
            flexGrow: 1,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            padding: theme.spacing(3),
            justifyContent: "center",
            alignItems: "center"
        }, theme.breakpoints.down("sm"), {
            padding: 0
        }),
        content: {
            overflow: "auto"
        },
        contentWrapper: _defineProperty$6({
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "100vh"
        }, theme.breakpoints.up("sm"), {
            maxHeight: "90vh",
            width: "auto"
        })
    };
});
function CoverLayout(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_layoutConfig = param.layoutConfig, layoutConfig = _param_layoutConfig === void 0 ? CoverLayoutDefaults : _param_layoutConfig;
    var _useLayoutDefinition = _slicedToArray$5(useLayoutDefinition(layoutConfig || CoverLayoutDefaults), 1), layoutProps = _useLayoutDefinition[0];
    var _useApplication = useApplication(), _useApplication_themes = _useApplication.themes, themes = _useApplication_themes === void 0 ? {} : _useApplication_themes, config = _useApplication.config;
    var applicationInfo = {
        author: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        url: (config === null || config === void 0 ? void 0 : config.author.url) || "https://icatalyst.com",
        name: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        logo: (config === null || config === void 0 ? void 0 : config.author.logo) || "static/images/logos/logo-shape.png"
    };
    var definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
    var _useStyles = useStyles$9(_objectSpreadProps$6(_objectSpread$6({}, layoutProps), {
        mainTheme: definedTheme
    }), {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    if (!layoutProps) {
        return null;
    }
    var theme = layoutProps.theme, background = layoutProps.background, content = layoutProps.content, contextPanel = layoutProps.contextPanel, messages = layoutProps.messages, footer = layoutProps.footer;
    return /*#__PURE__*/ jsx(ThemeProvider, {
        theme: themes[theme.main],
        children: /*#__PURE__*/ jsxs(Container, {
            className: cx(classes.root, className),
            style: style,
            imageSrc: background.image,
            imageAlpha: background.alpha,
            imageFit: background.fit,
            imagePosition: background.position,
            square: true,
            children: [
                /*#__PURE__*/ jsxs("div", {
                    className: cx(classes.contentArea),
                    children: [
                        /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.dialog],
                            children: /*#__PURE__*/ jsx(StateDialog, {})
                        }),
                        /*#__PURE__*/ jsx(AppSnackbar, {
                            anchorOrigin: {
                                vertical: messages.position.vertical,
                                horizontal: messages.position.horizontal
                            }
                        }),
                        contextPanel.display && /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.panel],
                            children: /*#__PURE__*/ jsx(AppContextPanel, {
                                position: contextPanel.position
                            })
                        }),
                        /*#__PURE__*/ jsx(ThemeProvider, {
                            theme: themes[theme.content],
                            children: /*#__PURE__*/ jsx("div", {
                                className: cx(classes.contentWrapper),
                                children: /*#__PURE__*/ jsx(Container, {
                                    className: cx(classes.content),
                                    style: _objectSpreadProps$6(_objectSpread$6({}, style), {
                                        backgroundColor: themes[theme.content].palette.background.paper
                                    }),
                                    elevation: content.elevation,
                                    children: /*#__PURE__*/ jsx(Outlet, {})
                                })
                            })
                        })
                    ]
                }),
                footer.display && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.footer],
                    children: /*#__PURE__*/ jsx(AppFooter$1, {
                        elevation: footer.elevation,
                        organisationInfo: applicationInfo
                    })
                })
            ]
        })
    });
}

function _arrayLikeToArray$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$4(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$5(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit$4(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$4() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$5(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$5(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$5(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$5(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$5(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray$4(arr, i) {
    return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4();
}
function _unsupportedIterableToArray$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
var EmptyLayoutDefaults = {
    name: "empty",
    theme: {
        main: "defaultDark",
        panel: "defaultLight",
        dialog: "defaultLight",
        footer: "defaultLight"
    },
    contextPanel: {
        display: true,
        position: "right"
    },
    messages: {
        position: {
            vertical: "bottom",
            horizontal: "left"
        }
    },
    footer: {
        display: true
    }
};
var useStyles$8 = makeStyles()(function(defaultTheme, layoutConfig) {
    var theme = layoutConfig.mainTheme || defaultTheme;
    return {
        root: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        },
        contentWrapper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            flexShrink: 1,
            overflow: "auto"
        }
    };
});
function EmptyLayout(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_layoutConfig = param.layoutConfig, layoutConfig = _param_layoutConfig === void 0 ? EmptyLayoutDefaults : _param_layoutConfig;
    var _useApplication = useApplication(), _useApplication_themes = _useApplication.themes, themes = _useApplication_themes === void 0 ? {} : _useApplication_themes, config = _useApplication.config;
    var _useLayoutDefinition = _slicedToArray$4(useLayoutDefinition(layoutConfig || EmptyLayoutDefaults), 1), layoutProps = _useLayoutDefinition[0];
    var applicationInfo = {
        author: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        url: (config === null || config === void 0 ? void 0 : config.author.url) || "https://icatalyst.com",
        name: (config === null || config === void 0 ? void 0 : config.author.name) || "ICatalyst Pte. Ltd.",
        logo: (config === null || config === void 0 ? void 0 : config.author.logo) || "static/images/logos/logo-shape.png"
    };
    var definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
    var _useStyles = useStyles$8(_objectSpreadProps$5(_objectSpread$5({}, layoutProps), {
        mainTheme: definedTheme
    }), {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var theme = layoutProps.theme, messages = layoutProps.messages, contextPanel = layoutProps.contextPanel, footer = layoutProps.footer;
    return /*#__PURE__*/ jsx(ThemeProvider, {
        theme: themes[theme.main],
        children: /*#__PURE__*/ jsxs("div", {
            className: cx(classes.root, className),
            style: style,
            children: [
                /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.dialog],
                    children: /*#__PURE__*/ jsx(StateDialog, {})
                }),
                /*#__PURE__*/ jsx(AppSnackbar, {
                    anchorOrigin: {
                        vertical: messages.position.vertical,
                        horizontal: messages.position.horizontal
                    }
                }),
                contextPanel.display && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.panel],
                    children: /*#__PURE__*/ jsx(AppContextPanel, {
                        position: contextPanel.position
                    })
                }),
                /*#__PURE__*/ jsx("div", {
                    className: cx(classes.contentWrapper),
                    children: /*#__PURE__*/ jsx(Outlet, {})
                }),
                footer.display && /*#__PURE__*/ jsx(ThemeProvider, {
                    theme: themes[theme.footer],
                    children: /*#__PURE__*/ jsx(AppFooter$1, {
                        color: footer.color,
                        elevation: footer.elevation,
                        organisationInfo: applicationInfo
                    })
                })
            ]
        })
    });
}

function _arrayLikeToArray$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$3(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles$1(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}
function _iterableToArray$1(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit$3(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread$1() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$3(arr, i) {
    return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _toConsumableArray$1(arr) {
    return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$1();
}
function _unsupportedIterableToArray$3(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
var useStyles$7 = makeStyles()(function(theme) {
    return {
        root: {
            padding: theme.spacing(2),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            width: "100%",
            overflow: "auto",
            flexGrow: 1,
            flexShrink: 1
        },
        form: {
            width: "100%",
            minHeight: "100%"
        }
    };
});
function DetailContent(param) {
    var className = param.className, style = param.style, classesProp = param.classes, model = param.model, repository = param.repository;
    var _useStyles = useStyles$7(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var recordID = useParams().recordID;
    var _useState = _slicedToArray$3(useState(repository.getState()), 2), dataState = _useState[0], setDataState = _useState[1];
    useObservable(repository.getObservable(), setDataState);
    useEffectOnce(function() {
        if (recordID) {
            repository.findOne(recordID);
        }
    }, [
        recordID
    ]);
    var entity = useMemo(function() {
        return dataState.lastRetrieved ? _.cloneDeep(dataState.lastRetrieved) : null;
    }, [
        dataState.lastRetrieved
    ]);
    var errors = useMemo(function() {
        if (!dataState.errors || dataState.errors.length === 0) {
            return null;
        } else {
            return _toConsumableArray$1(dataState.errors);
        }
    }, [
        dataState.errors
    ]);
    return entity || errors ? /*#__PURE__*/ jsx("div", {
        className: cx(classes.root, className),
        style: style,
        children: /*#__PURE__*/ jsx(EntityViewForm, {
            className: cx(classes.form),
            model: model,
            onSubmit: function(err, cb) {
                console.log({
                    err: err,
                    cb: cb
                });
            },
            value: entity,
            dense: false,
            errors: errors,
            variant: "filled"
        })
    }) : /*#__PURE__*/ jsx(Loader, {});
}

var useStyles$6 = makeStyles()(function() {
    return {
        root: {}
    };
});
function MasterContent(param) {
    var className = param.className, style = param.style, classesProp = param.classes, model = param.model, repository = param.repository, onRowClick = param.onRowClick, onSelectionChange = param.onSelectionChange, tableRef = param.tableRef;
    var _useStyles = useStyles$6(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsx(RepositoryTable, {
        tableRef: tableRef,
        className: cx(classes.root, className),
        style: style,
        model: model,
        repository: repository,
        onRowClick: onRowClick,
        onSelectionChange: onSelectionChange
    });
}

function _defineProperty$4(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$4(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$4(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$4(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$4(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$4(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$4(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$4(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$4(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles$5 = makeStyles()(function(theme) {
    return {
        root: {
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: theme.palette.divider
        },
        inputField: {
            maxWidth: theme.spacing(40),
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4)
        },
        titleHeader: {
            marginLeft: theme.spacing(-0.5)
        }
    };
});
function MasterDetailHeader(_param) {
    var className = _param.className; _param.style; var classesProp = _param.classes, title = _param.title, onAddClick = _param.onAddClick, onDeleteClick = _param.onDeleteClick, onBackClick = _param.onBackClick, onSearchChange = _param.onSearchChange, model = _param.model, rest = _objectWithoutProperties$4(_param, [
        "className",
        "style",
        "classes",
        "title",
        "onAddClick",
        "onDeleteClick",
        "onBackClick",
        "onSearchChange",
        "model"
    ]);
    var _useStyles = useStyles$5(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var recordID = useParams().recordID;
    var isDetail = recordID !== null && recordID !== undefined;
    var _useContext = useContext(MasterDetailContext), _useContext_selected = _useContext.selected, selected = _useContext_selected === void 0 ? [] : _useContext_selected;
    var t = useContext(LocalizationContext).t;
    return /*#__PURE__*/ jsx(SectionHeader, _objectSpreadProps$4(_objectSpread$4({}, rest), {
        title: title,
        className: cx(classes.root, className),
        titleAction: isDetail && /*#__PURE__*/ jsxs("div", {
            className: cx(classes.titleHeader),
            children: [
                /*#__PURE__*/ jsx(IconButton, {
                    size: "small",
                    icon: "arrow_back",
                    onClick: onBackClick
                }),
                /*#__PURE__*/ jsx(Typography, {
                    variant: "caption",
                    children: model === null || model === void 0 ? void 0 : model.pluralTitle
                })
            ]
        }),
        actions: !recordID ? [
            onSearchChange && function() {
                return /*#__PURE__*/ jsx(TextField, {
                    id: "search",
                    className: cx(classes.inputField),
                    icon: "search",
                    placeholder: "Search ".concat(title, "..."),
                    variant: "pill",
                    size: "small",
                    clearable: true,
                    onChange: function(e, value) {
                        onSearchChange(e, value);
                    }
                }, "searchField");
            },
            selected.length === 0 ? {
                title: t("Add"),
                icon: "add",
                color: "primary",
                onClick: onAddClick
            } : {
                title: t("Delete"),
                icon: "delete",
                color: "primary",
                onClick: onDeleteClick
            }
        ].filter(function(i) {
            return i;
        }) : []
    }));
}

/* eslint-disable @typescript-eslint/ban-types */ function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit$2(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray$2(arr, i) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
var MasterDetailLayoutDefaults = {
    name: "masterDetail",
    theme: {
        main: "defaultLight"
    }
};
var useStyles$4 = makeStyles()(function(theme) {
    return {
        root: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            padding: 0,
            overflow: "auto"
        },
        masterHeader: {
            width: "100%",
            padding: theme.spacing(3),
            paddingTop: theme.spacing(4),
            marginBottom: 0
        },
        detailHeader: {
            width: "100%",
            padding: theme.spacing(3),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
            marginBottom: 0
        },
        errorWrapper: {
            flexGrow: 0,
            flexShrink: 0
        }
    };
});
var MasterDetailContext = /*#__PURE__*/ createContext({});
var newRoute = "/new";
var detailRoute = "/:recordID";
function MasterDetailLayout(param) {
    var className = param.className, style = param.style, classesProp = param.classes, _param_layoutConfig = param.layoutConfig, layoutConfig = _param_layoutConfig === void 0 ? MasterDetailLayoutDefaults : _param_layoutConfig, repositoryName = param.repositoryName, dataDefinition = param.dataDefinition;
    var _useStyles = useStyles$4(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var _useLayoutDefinition = _slicedToArray$2(useLayoutDefinition(layoutConfig || MasterDetailLayoutDefaults), 1); _useLayoutDefinition[0];
    var _useApplication = useApplication(); _useApplication.themes; _useApplication.config;
    var t = useContext(LocalizationContext).t;
    var parentContext = useContext(MasterDetailContext);
    var navigate = useNavigate();
    var isRootContext = !parentContext;
    var _useApplicationRepository = useApplicationRepository(repositoryName, dataDefinition), repository = _useApplicationRepository.repository, repositoryDescriptor = _useApplicationRepository.repositoryDescriptor, dataState = _useApplicationRepository.dataState;
    var tableRef = React.useRef(null);
    var _useState = _slicedToArray$2(useState([]), 2), selected = _useState[0], setSelected = _useState[1];
    var errors = useMemo(function() {
        return (dataState === null || dataState === void 0 ? void 0 : dataState.errors) && dataState.errors.length > 0 ? dataState.errors.filter(function(e) {
            // We filter out cancelled errors because of the use string
            return e[0] !== "canceled";
        }).map(function(e) {
            return {
                message: t.apply(void 0, _toConsumableArray(e))
            };
        }) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        dataState === null || dataState === void 0 ? void 0 : dataState.errors
    ]);
    var hasErrors = errors && errors.length > 0;
    var handleSelectionChange = function(selected) {
        setSelected(selected);
    };
    return dataState && dataState.page.data ? /*#__PURE__*/ jsx(MasterDetailContext.Provider, {
        value: {
            isRootContext: isRootContext,
            selected: selected
        },
        children: /*#__PURE__*/ jsxs(Page, {
            className: cx(classes.root, className),
            style: style,
            square: true,
            children: [
                /*#__PURE__*/ jsxs(Routes, {
                    children: [
                        /*#__PURE__*/ jsx(Route, {
                            path: newRoute,
                            element: "header:/new"
                        }),
                        /*#__PURE__*/ jsx(Route, {
                            path: detailRoute,
                            element: /*#__PURE__*/ jsx(MasterDetailHeader, {
                                className: cx(classes.detailHeader),
                                icon: repositoryDescriptor.icon,
                                title: dataState.lastRetrieved ? dataState.lastRetrieved[repositoryDescriptor.primaryTextField] : repositoryDescriptor.pluralTitle || "",
                                model: repositoryDescriptor,
                                onAddClick: function() {
                                    navigate("./new");
                                },
                                onBackClick: function() {
                                    navigate("./");
                                }
                            })
                        }),
                        /*#__PURE__*/ jsx(Route, {
                            index: true,
                            element: /*#__PURE__*/ jsx(MasterDetailHeader, {
                                className: cx(classes.masterHeader),
                                icon: repositoryDescriptor.icon,
                                title: repositoryDescriptor.pluralTitle || "",
                                subtitle: repositoryDescriptor.secondaryTextField ? dataState.lastRetrieved[repositoryDescriptor.secondaryTextField] : undefined,
                                model: repositoryDescriptor,
                                onAddClick: function() {
                                    navigate("./new");
                                },
                                onBackClick: function() {
                                    navigate("./");
                                },
                                onSearchChange: function(e, value) {
                                    var _tableRef_current;
                                    (_tableRef_current = tableRef.current) === null || _tableRef_current === void 0 ? void 0 : _tableRef_current.onSearchChange(value);
                                }
                            })
                        })
                    ]
                }),
                hasErrors && /*#__PURE__*/ jsx(ErrorWrapper, {
                    className: cx(classes.errorWrapper),
                    errors: errors,
                    variant: "condensed"
                }),
                /*#__PURE__*/ jsxs(Routes, {
                    children: [
                        /*#__PURE__*/ jsx(Route, {
                            path: newRoute,
                            element: "path:/new"
                        }),
                        /*#__PURE__*/ jsx(Route, {
                            path: detailRoute,
                            element: /*#__PURE__*/ jsx(DetailContent, {
                                model: repositoryDescriptor,
                                repository: repository
                            })
                        }),
                        /*#__PURE__*/ jsx(Route, {
                            index: true,
                            element: /*#__PURE__*/ jsx(MasterContent, {
                                tableRef: tableRef,
                                model: repositoryDescriptor,
                                repository: repository,
                                onSelectionChange: handleSelectionChange,
                                onRowClick: function(data) {
                                    navigate("./".concat(data.id));
                                }
                            })
                        })
                    ]
                })
            ]
        })
    }) : /*#__PURE__*/ jsx(Loader, {
        variant: "circular"
    });
}

function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$3(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$3(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$3(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$3(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$3(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$3(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$3(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
var useStyles$3 = makeStyles()(function(theme, param) {
    var backgroundColor = param.backgroundColor, iconColor = param.iconColor;
    var _mostReadable, _mostReadable1;
    // TODO: Need to set up values for inherit and disabled
    var paletteColor = iconColor;
    var color = (_mostReadable = mostReadable(backgroundColor, [
        theme.palette[paletteColor].main,
        theme.palette[paletteColor].light,
        theme.palette[paletteColor].dark
    ])) === null || _mostReadable === void 0 ? void 0 : _mostReadable.toHex8String();
    var textColor = ((_mostReadable1 = mostReadable(backgroundColor, [
        theme.palette.text.disabled,
        theme.palette.text.secondary,
        theme.palette.text.primary,
        theme.palette.grey[500]
    ])) === null || _mostReadable1 === void 0 ? void 0 : _mostReadable1.toHex8String()) || theme.palette.text.secondary;
    var _obj;
    return {
        root: {
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flexGrow: 1,
            flexShrink: 1,
            padding: theme.spacing(3),
            paddingTop: theme.spacing(4)
        },
        title: {
            margin: theme.spacing(2),
            marginTop: theme.spacing(1)
        },
        excerpt: {
            marginBottom: theme.spacing(4)
        },
        content: {
            marginBottom: theme.spacing(2)
        },
        contentScroll: {
            overflow: "auto",
            // This is zero to ensure that the content is centered if there are no children
            flexGrow: 0,
            flexShrink: 1,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        icon: (_obj = {
            width: "".concat(theme.spacing(12), "!important"),
            height: "".concat(theme.spacing(12), "!important"),
            fontSize: "".concat(theme.spacing(12), "!important")
        }, _defineProperty$3(_obj, theme.breakpoints.up("md"), {
            width: "".concat(theme.spacing(16), "!important"),
            height: "".concat(theme.spacing(16), "!important"),
            fontSize: "".concat(theme.spacing(16), "!important")
        }), _defineProperty$3(_obj, "marginBottom", theme.spacing(4)), _obj),
        iconColorFn: {
            color: color
        },
        contentWrapper: {
            marginBottom: theme.spacing(2)
        },
        captionColorFn: {
            color: textColor
        }
    };
});
var InfoPage = /*#__PURE__*/ forwardRef(function(_param, ref) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, children = _param.children, title = _param.title, icon = _param.icon, excerpt = _param.excerpt, content = _param.content, backgroundColor = _param.backgroundColor, _param_iconColor = _param.iconColor, iconColor = _param_iconColor === void 0 ? "primary" : _param_iconColor, rest = _objectWithoutProperties$3(_param, [
        "className",
        "style",
        "classes",
        "children",
        "title",
        "icon",
        "excerpt",
        "content",
        "backgroundColor",
        "iconColor"
    ]);
    var theme = useTheme();
    // icon could be the icon text, or could be a full node
    var iconName = typeof icon === "string" ? icon : null;
    var excerptText = typeof excerpt === "string" ? excerpt : null;
    var contentText = typeof content === "string" ? content : null;
    var _useState = _slicedToArray$1(useState(), 2), derivedBackground = _useState[0], setDerivedBackground = _useState[1];
    var _useState1 = _slicedToArray$1(useState(), 2), innerRef = _useState1[0], setInnerRef = _useState1[1];
    var containerRef = useCallback(function(node) {
        setDerivedBackground((node === null || node === void 0 ? void 0 : node.backgroundColor) || theme.palette.background.default);
        setInnerRef(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var _useStyles = useStyles$3({
        backgroundColor: derivedBackground || theme.palette.background.default,
        iconColor: iconColor
    }, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    useEffect(function() {
        if (!containerRef || !ref) {
            return;
        }
        if (typeof ref === "function") {
            ref(innerRef);
        } else {
            ref.current = innerRef;
        }
    }, [
        innerRef,
        containerRef,
        ref
    ]);
    return /*#__PURE__*/ jsxs(Page, _objectSpreadProps$3(_objectSpread$3({
        className: cx(classes.root, className),
        backgroundColor: backgroundColor,
        style: style,
        verticalAlign: "center",
        horizontalAlign: "center",
        ref: containerRef
    }, rest), {
        children: [
            // Render the IconName or the specified icon Component
            iconName ? /*#__PURE__*/ jsx(Icon, {
                className: cx(classes.icon, classes.iconColorFn),
                color: iconColor,
                children: iconName
            }) : icon,
            /*#__PURE__*/ jsx(Typography, {
                variant: "h4",
                component: "h1",
                className: cx(classes.title),
                children: title
            }),
            /*#__PURE__*/ jsxs("div", {
                className: cx(classes.contentScroll),
                children: [
                    // Render the excerpt text or the specified info Component
                    excerptText ? /*#__PURE__*/ jsx(Typography, {
                        variant: "subtitle1",
                        component: "div",
                        className: cx(classes.excerpt, classes.captionColorFn),
                        children: excerpt
                    }) : excerpt,
                    // Render the content text or the specified info Component
                    contentText ? /*#__PURE__*/ jsx(Typography, {
                        variant: "caption",
                        component: "div",
                        className: cx(classes.content, classes.captionColorFn),
                        children: content
                    }) : content,
                    children && /*#__PURE__*/ jsx("div", {
                        className: cx(classes.contentWrapper, classes.captionColorFn),
                        children: children
                    })
                ]
            })
        ]
    }));
});
var InfoPage$1 = InfoPage;

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty$2(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$2(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$2(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$2(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$2(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var useStyles$2 = makeStyles()(function(theme, param) {
    var backgroundColor = param.backgroundColor;
    var _mostReadable;
    var color = (_mostReadable = mostReadable(backgroundColor, [
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.primary.dark
    ])) === null || _mostReadable === void 0 ? void 0 : _mostReadable.toHex8String();
    return {
        root: {
            width: "100%"
        },
        linkWrapper: {
            marginBottom: theme.spacing(2)
        },
        link: {},
        linkColorFn: {
            color: color,
            textDecorationColor: color
        }
    };
});
function ErrorPage(_param) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, children = _param.children, title = _param.title, message = _param.message, _param_linkPath = _param.linkPath, linkPath = _param_linkPath === void 0 ? "/" : _param_linkPath, linkText = _param.linkText, _param_icon = _param.icon, icon = _param_icon === void 0 ? "error" : _param_icon, _param_iconColor = _param.iconColor, iconColor = _param_iconColor === void 0 ? "error" : _param_iconColor, rest = _objectWithoutProperties$2(_param, [
        "className",
        "style",
        "classes",
        "children",
        "title",
        "message",
        "linkPath",
        "linkText",
        "icon",
        "iconColor"
    ]);
    var theme = useTheme();
    var _useState = _slicedToArray(useState(), 2), derivedBackground = _useState[0], setDerivedBackground = _useState[1];
    var _useStyles = useStyles$2({
        backgroundColor: derivedBackground || theme.palette.background.default
    }, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    var containerRef = useCallback(function(node) {
        setDerivedBackground((node === null || node === void 0 ? void 0 : node.backgroundColor) || theme.palette.background.default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return /*#__PURE__*/ jsx(InfoPage$1, _objectSpreadProps$2(_objectSpread$2({
        className: cx(classes.root, className),
        style: style,
        title: title,
        excerpt: message,
        icon: icon,
        ref: containerRef,
        iconColor: iconColor,
        renderNavigation: false,
        content: linkText && /*#__PURE__*/ jsx(Typography, {
            className: cx(classes.linkWrapper),
            children: /*#__PURE__*/ jsx(Link$1, {
                className: cx(classes.link, classes.linkColorFn),
                href: linkPath,
                children: linkText
            })
        })
    }, rest), {
        children: children
    }));
}

function _defineProperty$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty$1(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps$1(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties$1(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$1(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles$1 = makeStyles()(function(theme) {
    var _obj, _obj1;
    return {
        root: {
            padding: 0,
            overflow: "hidden",
            height: "100%"
        },
        header: (_obj = {
            display: "flex",
            flexGrow: 0,
            flexShrink: 0,
            paddingBottom: 0,
            padding: theme.spacing(1),
            paddingTop: theme.spacing(2),
            paddingRight: 0
        }, _defineProperty$1(_obj, theme.breakpoints.up("sm"), {
            padding: theme.spacing(2),
            paddingBottom: 0,
            paddingRight: theme.spacing(2)
        }), _defineProperty$1(_obj, theme.breakpoints.up("md"), {
            padding: theme.spacing(3),
            paddingBottom: 0,
            paddingTop: theme.spacing(3),
            paddingRight: theme.spacing(3)
        }), _obj),
        content: (_obj1 = {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            paddingTop: 0,
            overflow: "auto",
            padding: theme.spacing(1),
            paddingRight: 0
        }, _defineProperty$1(_obj1, theme.breakpoints.up("sm"), {
            padding: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }), _defineProperty$1(_obj1, theme.breakpoints.up("md"), {
            padding: theme.spacing(3),
            paddingRight: theme.spacing(3)
        }), _obj1),
        containerRoot: {}
    };
});
function TitledPage(_param) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, children = _param.children; _param.renderNavigation; var headerSize = _param.headerSize, title = _param.title, actions = _param.actions, _param_titleVariant = _param.titleVariant, titleVariant = _param_titleVariant === void 0 ? "condensed" : _param_titleVariant, icon = _param.icon, iconColor = _param.iconColor, iconTitle = _param.iconTitle, onIconClick = _param.onIconClick, rest = _objectWithoutProperties$1(_param, [
        "className",
        "style",
        "classes",
        "children",
        "renderNavigation",
        "headerSize",
        "title",
        "actions",
        "titleVariant",
        "icon",
        "iconColor",
        "iconTitle",
        "onIconClick"
    ]);
    var _useStyles = useStyles$1(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsxs(Page, _objectSpreadProps$1(_objectSpread$1({
        className: cx(classes.root, className),
        style: style,
        // Render the navigation in the title instead of the page base
        renderNavigation: false,
        classes: {
            root: cx(classes.containerRoot)
        }
    }, rest), {
        children: [
            /*#__PURE__*/ jsx(SectionHeader, {
                className: cx(classes.header),
                title: title,
                size: headerSize,
                actions: actions,
                variant: titleVariant,
                icon: icon,
                iconColor: iconColor,
                iconTitle: iconTitle,
                onIconClick: onIconClick
            }),
            /*#__PURE__*/ jsx("div", {
                className: cx(classes.content),
                children: children
            })
        ]
    }));
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var useStyles = makeStyles()(function() {
    return {
        root: {},
        container: {
            flexGrow: 1
        }
    };
});
function WebPage(_param) {
    var className = _param.className, style = _param.style, classesProp = _param.classes, title = _param.title, src = _param.src, sandbox = _param.sandbox, rest = _objectWithoutProperties(_param, [
        "className",
        "style",
        "classes",
        "title",
        "src",
        "sandbox"
    ]);
    var _useStyles = useStyles(undefined, {
        props: {
            classes: classesProp
        }
    }), classes = _useStyles.classes, cx = _useStyles.cx;
    return /*#__PURE__*/ jsx(TitledPage, _objectSpreadProps(_objectSpread({
        className: cx(classes.root, className),
        style: style,
        title: title
    }, rest), {
        children: /*#__PURE__*/ jsx(WebContainer, {
            className: cx(classes.container),
            title: title,
            src: src,
            sandbox: sandbox
        })
    }));
}

export { AppContextPanel, AppFooter$1 as AppFooter, AppNavbar$1 as AppNavbar, AppSnackbar, AppToolbar$1 as AppToolbar, AppUserInfo, Chat, ConsoleLayout, ConsoleLayoutDefaults, CoverLayout, CoverLayoutDefaults, EmptyLayout, EmptyLayoutDefaults, ErrorPage, InfoPage$1 as InfoPage, MasterDetailContext, MasterDetailLayout, MasterDetailLayoutDefaults, MultiUserCanvas, TitledPage, WebPage, useLayoutDefinition };
