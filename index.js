import { jsxs, jsx, Fragment } from '@emotion/react/jsx-runtime';
import { makeStyles } from 'tss-react/mui';
import { useMouse, useWebsockets, Container, Icon, Avatar, TextField, IconButton, useLayoutSelector, useContextPanelSelector, ContextPanel, LocalizationContext, Footer, Link, Image, useAuthorisation, TitleBar, Navbar, useMessageSelector, Snackbar, ACTIONS, useApplication, findModule, useLocalization, useHookWithRefCallback, useBreakpoint, useContextRoutes, StateDialog, useObservable, EntityViewForm, Loader, FeatureCard, RepositoryTable, RepositoryGrid, ModelPermission, SectionHeader, useApplicationRepository, Page, ErrorWrapper, WebContainer, Settings } from '@icatalyst/react-ui-components';
import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, forwardRef, useContext, createContext } from 'react';
import { Typography, AppBar, Toolbar, Badge, Tooltip, Link as Link$1 } from '@mui/material';
import { tinycolor, moment, randomColor, _, mostReadable } from '@icatalyst/js-core';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate, Outlet, useParams, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { from, filter, map, concatMap, catchError, of, toArray, tap, take } from 'rxjs';

const useStyles$l = makeStyles()(theme => {
  return {
    root: {
      position: 'relative'
    },
    userAvatar: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      transition: theme.transitions.create(['top', 'left'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
      })
    }
  };
});
function UserAvatar({
  displayName,
  location
}) {
  const {
    classes,
    cx
  } = useStyles$l();
  return jsxs("div", Object.assign({
    className: cx(classes.userAvatar),
    style: {
      top: location.y,
      left: location.x
    }
  }, {
    children: [jsx(Icon, Object.assign({
      size: "small"
    }, {
      children: "north_west"
    })), jsx(Typography, Object.assign({
      variant: "caption"
    }, {
      children: displayName
    }))]
  }));
}
function MultiUserCanvas({
  className,
  style,
  classes: classesProp,
  host,
  namespace,
  debounce = 200
}) {
  const {
    classes,
    cx
  } = useStyles$l(undefined, {
    props: {
      classes: classesProp
    }
  });
  const [displayName, setDisplayName] = useState('Unknown User');
  const [users, setUsers] = useState({});
  const containerRef = useRef(null);
  const handleWSEvent = (event, data) => {
    const {
      type,
      socketID,
      payload,
      displayName
    } = data;
    switch (type) {
      case 'mousemove':
        setUsers(users => {
          return Object.assign(Object.assign({}, users), {
            [socketID]: Object.assign(Object.assign({}, users[socketID] || {}), {
              displayName,
              location: {
                x: payload.offsetX,
                y: payload.offsetY
              }
            })
          });
        });
        break;
      default:
        console.log(event, {
          data
        });
        break;
    }
  };
  const handleUserConnectedEvent = (event, data) => {
    setUsers(users => {
      return Object.assign(Object.assign({}, users), {
        [data.socketID]: {
          displayName: displayName,
          location: {
            x: 0,
            y: 0
          }
        }
      });
    });
  };
  const handleUserDisconnectedEvent = (event, data) => {
    setUsers(users => {
      delete users[data.socketID];
      return users;
    });
  };
  const handleConnectEvent = (event, data) => {
    emitEvent('user', {
      namespace: namespace,
      username: 'a user name'
    });
  };
  const {
    offsetX,
    offsetY
  } = useMouse(containerRef, {
    debounce: debounce
  });
  const {
    connected,
    emitEvent,
    socketID,
    error
  } = useWebsockets(host, namespace, {
    connect: handleConnectEvent,
    disconnect: handleWSEvent,
    connect_error: handleWSEvent,
    room: handleWSEvent,
    user: handleWSEvent,
    message: handleWSEvent,
    user_connected: handleUserConnectedEvent,
    user_disconnected: handleUserDisconnectedEvent
  });
  useEffect(() => {
    if (connected) {
      emitEvent('message', {
        type: 'mousemove',
        message: '',
        displayName: displayName,
        payload: {
          offsetX,
          offsetY
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, offsetX, offsetY]);
  return jsxs(Container, Object.assign({
    ref: containerRef,
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsxs(Typography, Object.assign({
      color: connected ? 'green' : 'error'
    }, {
      children: [connected ? 'Connected' : 'Not Connected', " ", `SocketID: ${socketID}`]
    })), jsx(Typography, Object.assign({
      color: "error"
    }, {
      children: error
    })), Object.entries(users).map(([socketID, userInfo]) => {
      return jsx(UserAvatar, {
        displayName: userInfo.displayName,
        location: userInfo.location
      }, socketID);
    })]
  }));
}

const useStyles$k = makeStyles()((theme, {
  color
}) => {
  const userColor = tinycolor(color).setAlpha(0.075).toHex8String();
  const textColor = theme.palette.text.primary;
  return {
    root: {
      width: '100%'
    },
    header: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1),
      backgroundColor: userColor,
      padding: theme.spacing(1),
      marginRight: theme.spacing(4),
      textAlign: 'left',
      color: textColor
    },
    textLocal: {
      marginRight: 0,
      marginLeft: theme.spacing(4),
      textAlign: 'right'
    },
    avatar: {
      marginRight: theme.spacing(1),
      flexShrink: 0,
      border: `2px solid ${userColor}`
    },
    displayName: {
      fontWeight: 'bold',
      flexShrink: 1,
      flexGrow: 1
    },
    time: {
      flexShrink: 0
    }
  };
});
function UserMessage({
  className,
  style,
  classes: classesProp,
  message
}) {
  const {
    classes,
    cx
  } = useStyles$k({
    color: message.user.color
  }, {
    props: {
      classes: classesProp
    }
  });
  function formatTime(time) {
    return moment(time).fromNow();
  }
  return jsxs("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsxs("div", Object.assign({
      className: cx(classes.header)
    }, {
      children: [jsx(Avatar, {
        className: cx(classes.avatar),
        title: message.user.displayName,
        src: message.user.avatar,
        size: "small",
        backgroundColor: tinycolor(message.user.color).toHex8String()
      }), jsx(Typography, Object.assign({
        className: cx(classes.displayName),
        variant: "caption",
        noWrap: true
      }, {
        children: message.user.displayName
      })), jsx(Typography, Object.assign({
        variant: "caption",
        className: cx(classes.time),
        color: "secondaryText",
        noWrap: true
      }, {
        children: formatTime(message.timestamp)
      }))]
    })), jsx("div", Object.assign({
      className: cx(classes.text, message.local && classes.textLocal)
    }, {
      children: message.message
    }))]
  }));
}

const useStyles$j = makeStyles()(theme => {
  return {
    root: {
      width: theme.spacing(33),
      borderRadius: theme.shape.borderRadius,
      borderWidth: 'thin',
      borderColor: theme.palette.divider,
      borderStyle: 'solid',
      background: theme.palette.background.paper
    },
    toolbarTitle: {
      marginLeft: theme.spacing(2)
    },
    divider: {
      flexGrow: 1,
      height: '100%'
    },
    contentWrapper: {
      width: '100%',
      height: theme.spacing(48),
      maxHeight: 0,
      transition: theme.transitions.create(['max-height'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
      }),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    contentWrapperExpanded: {
      maxHeight: theme.spacing(100)
    },
    messages: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(2),
      flexGrow: 1,
      overflow: 'auto'
    },
    input: {
      flexShrink: 0
    }
  };
});
function Chat({
  className,
  style,
  classes: classesProp,
  open = false,
  host,
  namespace
}) {
  const {
    classes,
    cx
  } = useStyles$j(undefined, {
    props: {
      classes: classesProp
    }
  });
  const [isOpen, setIsOpen] = useState(open);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const messagesRef = useRef(null);
  const [users, setUsers] = useState({});
  const [user, setUser] = useState({
    id: 'my id',
    displayName: 'Display Name',
    avatar: '',
    color: randomColor().toHex8String()
  });
  const handleConnectEvent = (event, data) => {
    emitEvent('user', {
      namespace: namespace,
      user: user
    });
  };
  function handleWSEvent(event, data) {
    const {
      type
    } = data;
    switch (type) {
      case 'message':
        setMessages(messages => {
          return [...messages, ...data];
        });
        break;
      default:
        console.log(event, {
          data
        });
        break;
    }
  }
  const handleUserConnectedEvent = (event, data) => {
    setUsers(users => {
      return Object.assign(Object.assign({}, users), {
        [data.socketID]: data
      });
    });
  };
  const handleUserDisconnectedEvent = (event, data) => {
    setUsers(users => {
      delete users[data.socketID];
      return users;
    });
  };
  const {
    connected,
    emitEvent
  } = useWebsockets(host, namespace, {
    connect: handleConnectEvent,
    disconnect: handleWSEvent,
    connect_error: handleWSEvent,
    room: handleWSEvent,
    user: handleWSEvent,
    message: handleWSEvent,
    user_connected: handleUserConnectedEvent,
    user_disconnected: handleUserDisconnectedEvent
  });
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  useEffect(() => {
    if (!isOpen) {
      setNotifications(notifications => notifications + 1);
    }
  }, [messages.length]);
  useLayoutEffect(() => {
    setTimeout(function () {
      if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 10);
  }, [messages.length]);
  function sendMessage(message) {
    const emitMessage = {
      type: 'message',
      message: message,
      timestamp: Date.now(),
      user: Object.assign({}, user)
    };
    setMessages(messages => {
      return [...messages, Object.assign(Object.assign({}, emitMessage), {
        local: true
      })];
    });
    emitEvent('message', emitMessage);
  }
  function handleClearableClicked() {
    sendMessage(message);
    setMessage('');
  }
  return jsxs("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsxs("div", Object.assign({
      className: cx(classes.contentWrapper, isOpen && classes.contentWrapperExpanded)
    }, {
      children: [jsx("div", Object.assign({
        className: cx(classes.messages),
        ref: messagesRef
      }, {
        children: messages.map(m => {
          return jsx(UserMessage, {
            message: m
          }, m.timestamp);
        })
      })), jsx("div", Object.assign({
        className: cx(classes.input)
      }, {
        children: jsx(TextField, {
          disabled: !connected,
          size: "small",
          placeholder: "Enter your message...",
          icon: "message",
          value: message,
          clearable: true,
          clearableIcon: "forward_to_inbox",
          onChange: (e, value) => {
            setMessage(value || '');
          },
          onClearableClick: handleClearableClicked,
          onKeyDown: e => {
            if (e.code === 'Enter') {
              handleClearableClicked();
            }
          }
        })
      }))]
    })), jsx(AppBar, Object.assign({
      position: "relative",
      color: "secondary"
    }, {
      children: jsxs(Toolbar, Object.assign({
        variant: "dense"
      }, {
        children: [jsx(Badge, Object.assign({
          badgeContent: notifications,
          color: "success",
          variant: "dot"
        }, {
          children: jsx(Icon, Object.assign({
            size: "small"
          }, {
            children: "chat_bubble"
          }))
        })), jsx(Typography, Object.assign({
          className: cx(classes.toolbarTitle),
          variant: "caption"
        }, {
          children: "Chat"
        })), jsx("div", {
          className: cx(classes.divider)
        }), jsx(IconButton, {
          color: "inherit",
          size: "small",
          icon: isOpen ? 'expand_more' : 'expand_less',
          onClick: () => {
            setNotifications(0);
            setIsOpen(open => !open);
          }
        })]
      }))
    }))]
  }));
}

/**
 * The useLayoutDefinition hook makes it easier to manage the layout configuration by
 * managing and resolving any user defined overrides for a specific layout
 * @param defaults the default settings for the layout.  Any user overrides are merged with this
 * @returns the resolved layout and a function to set overrides for the user
 */
function useLayoutDefinition(defaults) {
  const name = defaults.name;
  // Check if we have a matching definition in the store
  const currentLayoutSettings = useLayoutSelector(name);
  const resolvedLayout = useMemo(() => {
    return _.merge({}, defaults, currentLayoutSettings);
  }, [currentLayoutSettings, defaults]);
  const setLayoutOverrides = useCallback(overrides => {
    console.log('set overrides on app state');
  }, []);
  return [resolvedLayout, setLayoutOverrides];
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function AppContextPanel(props) {
  var _a;
  const _b = useContextPanelSelector(),
    {
      children
    } = _b,
    contextProps = __rest(_b, ["children"]);
  const panelRef = useRef(null);
  return jsx(ContextPanel, Object.assign({
    ref: panelRef
  }, props, contextProps, {
    PaperProps: {
      style: {
        position: 'absolute'
      }
    },
    BackdropProps: {
      style: {
        position: 'absolute'
      }
    },
    ModalProps: {
      container: (_a = panelRef === null || panelRef === void 0 ? void 0 : panelRef.current) === null || _a === void 0 ? void 0 : _a.parentNode,
      style: {
        position: 'absolute'
      },
      keepMounted: true
    }
  }, {
    children: children
  }));
}

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==";
  var defaultImage = img;

const useStyles$i = makeStyles()(theme => {
  return {
    root: {
      display: 'relative',
      zIndex: 10,
      color: theme.palette.secondary.contrastText,
      background: theme.palette.secondary.main
    },
    titleContent: {
      display: 'flex',
      flexDirection: 'row'
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  };
});
const AppFooter = forwardRef((_a, ref) => {
  var {
      className,
      style,
      classes: classesProp,
      organisationInfo,
      showOrganisationInfo = true,
      showFooterInfo = true
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "organisationInfo", "showOrganisationInfo", "showFooterInfo"]);
  const {
    t
  } = useContext(LocalizationContext);
  const {
    classes,
    cx
  } = useStyles$i(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    name,
    url,
    logo,
    author
  } = organisationInfo;
  const footerContent = t('©{0} {1}, All Rights Reserved.', new Date().getFullYear(), author);
  return jsx(Footer, Object.assign({
    ref: ref,
    className: cx(classes.root, className),
    style: style,
    position: "relative"
  }, rest, {
    titleContent: jsxs("div", Object.assign({
      className: cx(classes.titleContent)
    }, {
      children: [showOrganisationInfo && jsxs(Link, Object.assign({
        className: cx(classes.link),
        href: url,
        target: "_blank",
        classes: {
          icon: cx(classes.linkIcon)
        }
      }, {
        children: [jsx(Image, {
          className: cx(classes.linkImage),
          defaultSrc: defaultImage,
          alt: `${name} Logo`,
          src: logo
        }), jsx(Typography, Object.assign({
          variant: "caption",
          className: cx(classes.linkText)
        }, {
          children: name
        }))]
      })), showFooterInfo && jsx(Typography, Object.assign({
        variant: "caption",
        className: cx(classes.contentText),
        noWrap: true
      }, {
        children: footerContent
      }))]
    }))
  }));
});

const useStyles$h = makeStyles()(theme => {
  return {
    root: {
      color: theme.palette.primary.contrastText
    },
    root_inline: {
      color: theme.palette.text.primary
    },
    navMenuWrapper: {
      width: '100%',
      flexGrow: 1,
      overflow: 'auto',
      display: 'flex'
    }
  };
});
// TODO: Could be an authorisedRoutes hook
function filterRoutes(checkRoles, routes = []) {
  return routes.filter(r => {
    return !r.auth || checkRoles(r.auth);
  }).map(r => {
    if (r.routes) {
      return Object.assign(Object.assign({}, r), {
        routes: filterRoutes(checkRoles, r.routes)
      });
    } else {
      return r;
    }
  });
}
const AppNavbar = forwardRef((_a, ref) => {
  var _b;
  var {
      className,
      style,
      classes: classesProp,
      folded = false,
      TitleBarProps,
      PaperProps,
      showTitleBar = true,
      HeaderComponent,
      HeaderComponentProps = {},
      children,
      routes,
      variant = 'panel',
      orientation = 'vertical',
      itemVariant = 'rounded',
      navbarItemActiveBorder = true,
      maxDepth
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "folded", "TitleBarProps", "PaperProps", "showTitleBar", "HeaderComponent", "HeaderComponentProps", "children", "routes", "variant", "orientation", "itemVariant", "navbarItemActiveBorder", "maxDepth"]);
  const panelRef = useRef(null);
  const {
    classes,
    cx
  } = useStyles$h(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    auth = {},
    isInRole
  } = useAuthorisation();
  useEffect(() => {
    if (!panelRef || !ref) {
      return;
    }
    if (typeof ref === 'function') {
      ref(panelRef.current);
    } else {
      ref.current = panelRef.current;
    }
  }, [panelRef, ref]);
  const Header = useMemo(() => {
    return !HeaderComponent ? null : jsx(HeaderComponent, Object.assign({}, HeaderComponentProps));
  }, [HeaderComponent, HeaderComponentProps]);
  // Filter the routes based on the user roles
  const authorisedRoutes = useMemo(() => {
    return filterRoutes(isInRole, routes);
  }, [routes, isInRole]);
  return variant === 'panel' ? jsxs(ContextPanel, Object.assign({
    ref: panelRef,
    className: cx(classes.root, className),
    style: style,
    open: true,
    classes: classes
  }, rest, {
    PaperProps: Object.assign(Object.assign({}, PaperProps), {
      style: Object.assign(Object.assign({}, PaperProps === null || PaperProps === void 0 ? void 0 : PaperProps.style), {
        position: 'absolute',
        border: 0
      })
    }),
    BackdropProps: {
      style: {
        position: 'absolute'
      }
    },
    ModalProps: {
      container: (_b = panelRef === null || panelRef === void 0 ? void 0 : panelRef.current) === null || _b === void 0 ? void 0 : _b.parentElement,
      style: {
        position: 'absolute'
      },
      keepMounted: true
    },
    variant: "permanent"
  }, {
    children: [showTitleBar && jsx(TitleBar, Object.assign({}, TitleBarProps, {
      position: "relative",
      enableColorOnDark: true
    })), Header, jsx("div", Object.assign({
      className: cx(classes.navMenuWrapper)
    }, {
      children: jsx(Navbar, {
        routes: authorisedRoutes,
        orientation: "vertical",
        showLabel: !folded,
        showIconButton: !folded,
        itemVariant: itemVariant,
        maxDepth: maxDepth
      })
    })), children]
  })) : jsxs("div", Object.assign({
    className: cx(classes.root_inline, className)
  }, {
    children: [showTitleBar && jsx(TitleBar, Object.assign({}, TitleBarProps, {
      position: "relative",
      enableColorOnDark: true
    })), Header, jsx("div", Object.assign({
      className: cx(classes.navMenuWrapper)
    }, {
      children: jsx(Navbar, {
        routes: authorisedRoutes,
        orientation: "horizontal",
        showLabel: !folded,
        showIconButton: !folded,
        itemVariant: itemVariant,
        activeEmbelish: navbarItemActiveBorder,
        maxDepth: maxDepth
      })
    })), children]
  }));
});

function AppSnackbar(props) {
  const contextProps = useMessageSelector();
  const dispatch = useDispatch();
  return jsx(Snackbar, Object.assign({}, props, contextProps, {
    onClose: () => {
      dispatch(ACTIONS.message.hideMessage());
    }
  }));
}

const useStyles$g = makeStyles()(theme => {
  return {
    root: {
      display: 'relative',
      zIndex: 10,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary
    }
  };
});
const AppToolbar = forwardRef((_a, ref) => {
  var {
      className,
      style,
      classes: classesProp
    } = _a,
    rest = __rest(_a, ["className", "style", "classes"]);
  const {
    classes,
    cx
  } = useStyles$g(undefined, {
    props: {
      classes: classesProp
    }
  });
  return jsx(TitleBar, Object.assign({
    ref: ref,
    className: cx(classes.root, className),
    style: style
  }, rest, {
    position: "relative"
  }));
});

const useStyles$f = makeStyles()(theme => {
  return {
    root: {
      minHeight: theme.spacing(2),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: `calc(100% - ${theme.spacing(2)})`,
      overflow: 'hidden',
      textTransform: 'capitalize'
    },
    roleList: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      margin: 0,
      fontSize: theme.typography.caption.fontSize
    },
    roleItem: {
      listStyle: 'none',
      textTransform: 'capitalize'
    }
  };
});
function UserRoles({
  className,
  style,
  classes: classesProp,
  roles = []
}) {
  const {
    classes,
    cx
  } = useStyles$f(undefined, {
    props: {
      classes: classesProp
    }
  });
  return jsx(Tooltip, Object.assign({
    title: roles.length > 1 ? jsx("ul", Object.assign({
      className: cx(classes.roleList)
    }, {
      children: roles.map(role => {
        return jsx("li", Object.assign({
          className: cx(classes.roleItem)
        }, {
          children: role.name
        }), role.id);
      })
    })) : ''
  }, {
    children: jsx(Typography, Object.assign({
      className: cx(classes.root, className),
      style: style,
      variant: "caption"
    }, {
      children: roles.length > 0 && (roles.length === 1 ? roles[0].name : roles[0].name + ' + ' + (roles.length - 1))
    }))
  }));
}

const useStyles$e = makeStyles()(theme => {
  const avatarSize = theme.spacing(11);
  const avatarSizeFolded = theme.spacing(8);
  return {
    root: {
      background: theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.primary.contrastText,
      marginBottom: `calc(${avatarSize}/2)`
    },
    userRoles: {
      opacity: 1 - theme.palette.action.activatedOpacity,
      marginBottom: theme.spacing(2),
      maxWidth: `calc(100% - ${theme.spacing(4)})`,
      transition: theme.transitions.create(['opacity', 'width', 'height', 'margin'], {
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
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: `calc(100% - ${theme.spacing(4)})`,
      opacity: 1,
      height: theme.spacing(3),
      fontSize: theme.spacing(2),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0.5),
      transition: theme.transitions.create(['opacity', 'width', 'height', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      textTransform: 'capitalize'
    },
    hideDisplayName: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0
    },
    avatarWrapper: {
      position: 'relative',
      height: `calc((${avatarSize}/2) + ${theme.spacing(0.5)})`,
      transition: theme.transitions.create(['height'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    avatarWrapperProfilePath: {
      cursor: 'pointer',
      '& .profile-badge': {
        width: 0,
        height: 0,
        opacity: 0,
        right: '25%',
        transition: theme.transitions.create(['opacity', 'height', 'width', 'right'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      '&:hover .profile-badge': {
        opacity: 1,
        right: '5%',
        width: theme.spacing(4),
        height: theme.spacing(4)
      }
    },
    avatarWrapperMinimal: {
      position: 'relative',
      height: `calc(${avatarSizeFolded}/2)`
    },
    avatar: {
      borderWidth: theme.spacing(1),
      borderColor: theme.palette.background.paper,
      borderStyle: 'solid',
      transition: theme.transitions.create(['borderWidth'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      '& img': {
        marginLeft: theme.spacing(-1.5),
        marginTop: theme.spacing(-1.5)
      },
      '& svg': {
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
      transition: theme.transitions.create(['width', 'height'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    avatarSizeMinimal: {
      width: avatarSizeFolded,
      height: avatarSizeFolded
    },
    avatarFontSize: {
      fontSize: `calc(${avatarSize}/2)`,
      lineHeight: avatarSize,
      transition: theme.transitions.create(['fontSize'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    avatarFontSizeMinimal: {
      fontSize: `calc(${avatarSizeFolded} - ${theme.spacing(4)})`
    },
    editBadge: {
      position: 'absolute',
      top: '120%',
      borderRadius: '50%',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      cursor: 'pointer',
      overflow: 'hidden'
    },
    editBadgeIcon: {
      margin: '0 !important',
      marginTop: `${theme.spacing(0.25)} !important`,
      width: '100%',
      height: '100%'
    }
  };
});
function AppUserInfo({
  className,
  style,
  classes: classesProp,
  minimal = false,
  displayName,
  profileImage,
  roles,
  profilePath
}) {
  const {
    classes,
    cx
  } = useStyles$e(undefined, {
    props: {
      classes: classesProp
    }
  });
  const theme = useTheme();
  const navigate = useNavigate();
  return jsxs("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsx(Typography, Object.assign({
      noWrap: true,
      className: cx(classes.displayName, minimal && classes.hideDisplayName)
    }, {
      children: displayName
    })), jsx(UserRoles, {
      className: cx(classes.userRoles, minimal && classes.hideUserRoles),
      roles: roles
    }), jsxs("div", Object.assign({
      className: cx(classes.avatarWrapper, minimal && classes.avatarWrapperMinimal, profilePath && classes.avatarWrapperProfilePath),
      onClick: () => {
        if (profilePath) {
          navigate(profilePath);
        }
      }
    }, {
      children: [jsx(Avatar, {
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
      }), profilePath && jsx("div", Object.assign({
        className: cx(classes.editBadge, 'profile-badge')
      }, {
        children: jsx(Icon, Object.assign({
          className: cx(classes.editBadgeIcon),
          color: "inherit",
          size: "small"
        }, {
          children: "edit"
        }))
      }))]
    }))]
  }));
}

const useStyles$d = makeStyles()(theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      transition: theme.transitions.create(['margin'], {
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
      width: '100%',
      opacity: 1,
      fontSize: 16,
      marginLeft: theme.spacing(2),
      fontWeight: 'normal',
      flexShrink: 1,
      transition: theme.transitions.create(['width', 'opacity'], {
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
function AppLogo({
  className,
  style,
  classes: classesProp,
  showTitle = true,
  title,
  logo
}) {
  var _a;
  const {
    classes,
    cx
  } = useStyles$d(undefined, {
    props: {
      classes: classesProp
    }
  });
  const theme = useTheme();
  const appLogo = logo || (((_a = mostReadable(tinycolor(theme.palette.secondary.contrastText), ['#fff', '#000'], {})) === null || _a === void 0 ? void 0 : _a.toHexString()) === '#000000' ? 'assets/images/placeholders/image-dark.svg' : 'assets/images/placeholders/image-light.svg');
  return jsxs("div", Object.assign({
    className: cx(classes.root, className),
    style: style
  }, {
    children: [jsx(Avatar, {
      title: title,
      size: "medium",
      className: cx(classes.avatar),
      backgroundColor: theme.palette.background.paper,
      src: appLogo,
      classes: {
        sizeFn: cx(classes.avatarSize),
        imageSizeFn: cx(classes.avatarImageSize)
      }
    }), jsx(Typography, Object.assign({
      variant: "h1",
      component: "div",
      noWrap: true,
      className: cx(classes.logoText, !showTitle && classes.hideLogoText)
    }, {
      children: title
    }))]
  }));
}

const useStyles$c = makeStyles()(theme => {
  const outline = theme.palette.text.primary;
  return {
    root: {},
    animated: {
      background: 'transparent',
      borderRadius: '50%',
      border: 'none',
      height: theme.spacing(4),
      width: theme.spacing(4),
      cursor: 'pointer',
      '& .hamburger': {
        fill: outline,
        width: '100%',
        height: '100%'
      },
      '&:hover': {
        background: theme.palette.action.hover
      }
    },
    default: {},
    animated_simple: {
      '& .line': {
        transformOrigin: 'center',
        transition: [theme.transitions.create(['y'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }), theme.transitions.create(['rotate'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
          delay: theme.transitions.duration.enteringScreen
        }), theme.transitions.create(['opacity'], {
          easing: theme.transitions.easing.easeOut,
          duration: 0,
          delay: theme.transitions.duration.enteringScreen
        })].join(', ')
      },
      '&[aria-expanded="false"] .line': {
        transition: [theme.transitions.create(['y'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
          delay: theme.transitions.duration.enteringScreen
        }), theme.transitions.create(['rotate'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }), theme.transitions.create(['opacity'], {
          easing: theme.transitions.easing.easeOut,
          duration: 0,
          delay: theme.transitions.duration.enteringScreen
        })].join(', ')
      },
      '&[aria-expanded="true"] :is(.top, .bottom)': {
        y: 45
      },
      '&[aria-expanded="true"] .top': {
        rotate: '45deg'
      },
      '&[aria-expanded="true"] .bottom': {
        rotate: '-45deg'
      },
      '&[aria-expanded="true"] .middle': {
        opacity: 0
      },
      // Safari cannot animate rotate so this at least animates cross browser
      '@supports (font: -apple-system-body) and (-webkit-appearance: none)': {
        '&[aria-expanded="true"] .top': {
          rotate: '.5turn'
        },
        '&[aria-expanded="true"] .bottom': {
          rotate: '-.5turn'
        }
      }
    }
  };
});
function NavbarToggleButton({
  className,
  style,
  classes: classesProp,
  folded = true,
  icon,
  title,
  icons,
  actionName,
  ariaControls,
  variant = 'default'
}) {
  const {
    classes,
    cx
  } = useStyles$c(undefined, {
    props: {
      classes: classesProp
    }
  });
  const dispatch = useDispatch();
  const {
    pinIcon,
    closeIcon
  } = icons;
  icon = icon || (folded ? pinIcon.icon : closeIcon.icon);
  title = title || (folded ? pinIcon.text : closeIcon.text);
  const handleToggle = useCallback(() => {
    dispatch(ACTIONS.settings.setLayoutUserSettings({
      name: actionName,
      navbar: {
        folded: !folded
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folded]);
  return variant === 'default' ? jsx(IconButton, {
    className: cx(classes.root, className),
    style: style,
    size: "small",
    title: title,
    icon: icon,
    "aria-controls": ariaControls,
    "aria-expanded": !folded,
    color: "inherit",
    onClick: handleToggle
  }) : jsx("button", Object.assign({
    className: cx(classes.root, classes.animated, classes[variant]),
    "aria-controls": ariaControls,
    "aria-expanded": !folded,
    onClick: handleToggle
  }, {
    children: jsxs("svg", Object.assign({
      className: "hamburger",
      viewBox: "0 0 100 100"
    }, {
      children: [jsx("rect", {
        className: "line top",
        width: "80",
        height: "10",
        x: "10",
        y: "25",
        rx: "5"
      }), jsx("rect", {
        className: "line middle",
        width: "80",
        height: "10",
        x: "10",
        y: "45",
        rx: "5"
      }), jsx("rect", {
        className: "line bottom",
        width: "80",
        height: "10",
        x: "10",
        y: "65",
        rx: "5"
      })]
    }))
  }));
}

const ConsoleLayoutDefaults = {
  name: 'console',
  theme: {
    main: 'defaultDark',
    navbar: 'defaultLight',
    toolbar: 'defaultLight',
    footer: 'defaultLight',
    panel: 'defaultLight',
    dialog: 'defaultLight'
  },
  navbar: {
    display: true,
    contentPosition: 'outside',
    position: 'left',
    width: 280,
    foldedWidth: 64,
    flattenNav: true,
    folded: false,
    header: {
      elevation: 0,
      color: 'primary'
    },
    userInfo: {
      allowProfileClick: false
    },
    shadow: 0,
    orientation: 'vertical',
    navItemVariant: 'rounded',
    activeItemEmbelish: true,
    maxDepth: 3,
    contextNav: undefined
  },
  contextPanel: {
    display: true,
    position: 'right'
  },
  toolbar: {
    display: true,
    contentPosition: 'inside'
  },
  footer: {
    display: true,
    contentPosition: 'inside'
  },
  messages: {
    position: {
      vertical: 'bottom',
      horizontal: 'left'
    }
  }
};
const useStyles$b = makeStyles()((defaultTheme, layoutConfig) => {
  const navbarPosition = layoutConfig.navbar.position;
  const theme = layoutConfig.mainTheme || defaultTheme;
  const toolbarHeight = layoutConfig.toolbarHeight || 0;
  const footerHeight = layoutConfig.footerHeight || 0;
  const navbarHoverOpen = layoutConfig.navbarHoverOpen || false;
  const isFolded = layoutConfig.navbarResponsive ? !layoutConfig.navbar.folded : layoutConfig.navbar.folded;
  // The width that the navbar should be based on its state
  let navbarIntendedWidth = isFolded ? layoutConfig.navbar.foldedWidth : layoutConfig.navbar.width;
  if (layoutConfig.navbar.position === 'toolbar') {
    navbarIntendedWidth = 0;
  }
  // The actual width of the navbar based on hover and device type
  const navbarActualWidth = isFolded ? navbarHoverOpen ? layoutConfig.navbar.width : layoutConfig.navbar.foldedWidth : layoutConfig.navbar.width;
  const navbarBreakpoint = 'lg';
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    },
    appWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      flexGrow: 1,
      flexShrink: 0,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      // Tablet or mobile the navbar is hidden
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      // Larger screens the navbar is displayed
      [theme.breakpoints.up(navbarBreakpoint)]: {
        width: `calc(100% - ${navbarIntendedWidth}px)`,
        marginLeft: navbarPosition === 'left' ? `${navbarIntendedWidth}px` : undefined,
        marginRight: navbarPosition === 'right' ? `${navbarIntendedWidth}px` : undefined
      }
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      overflow: 'hidden'
    },
    contentWrapper_toolbarOutside: {
      maxHeight: `calc(100% - ${theme.spacing(8)})`
    },
    appNavbar: {
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        transition: theme.transitions.create(['width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        // Tablet or mobile the navbar is hidden
        width: `${navbarActualWidth === layoutConfig.navbar.foldedWidth ? 0 : navbarActualWidth}px`,
        // Larger screens the navbar is displayed
        [theme.breakpoints.up(navbarBreakpoint)]: {
          width: `${navbarActualWidth}px`
        }
      }
    },
    appPanelClipped: {
      marginTop: toolbarHeight,
      marginBottom: footerHeight
    },
    appBarOverlay: {
      zIndex: theme.zIndex.drawer + 1
    },
    appToolbar: {
      display: 'flex',
      flexDirection: 'row',
      flexShrink: 0
    },
    appToolbar_outside: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      '& .MuiToolbar-root': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    appToolbar_inside: {},
    appFooter: {
      display: 'flex',
      flexDirection: 'row',
      flexShrink: 0
    },
    appToolbarTitleWrapper_outside: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1
    },
    appToolbarTitle_outside: {
      width: `calc(${layoutConfig.navbar.width}px - ${theme.spacing(2)})`,
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      justifyContent: 'space-between'
    },
    navbarToggleButton_outside: {
      flexShrink: 0,
      flexGrow: 0
    },
    appLogo_outside: {
      flexShrink: 1,
      flexGrow: 1,
      maxWidth: `calc(${layoutConfig.navbar.width}px - ${theme.spacing(8)})`
    },
    appFooter_outside: {
      maxWidth: `calc(${layoutConfig.navbar.width}px - ${theme.spacing(4)})`
    },
    appFooter_inside: {},
    toolbar: {
      transition: theme.transitions.create(['padding'], {
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
    footerToolbarLink: {
      transition: theme.transitions.create(['padding', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      overflow: 'hidden',
      paddingLeft: theme.spacing(3),
      // Tablet or mobile the navbar is hidden
      width: `${navbarActualWidth === layoutConfig.navbar.foldedWidth ? 0 : navbarActualWidth}px`,
      // Larger screens the navbar is displayed
      [theme.breakpoints.up(navbarBreakpoint)]: {
        width: `${navbarActualWidth}px`
      }
    },
    footerToolbarLinkFolded: {
      paddingLeft: `calc((${navbarActualWidth}px - ${theme.spacing(3)}) /2)`
    },
    footerToolbarLinkText: {
      transition: theme.transitions.create(['opacity', 'width', 'margin'], {
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
      transition: theme.transitions.create(['opacity', 'width', 'margin'], {
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
      transition: theme.transitions.create(['margin'], {
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
function ConsoleLayout({
  className,
  style,
  classes: classesProp,
  layoutConfig = ConsoleLayoutDefaults
}) {
  var _a, _b;
  const [layoutProps] = useLayoutDefinition(layoutConfig || ConsoleLayoutDefaults);
  const {
    themes = {},
    config,
    getAuthContext,
    routes,
    modules
  } = useApplication();
  const {
    auth
  } = getAuthContext();
  const {
    user
  } = auth;
  const [navbarHoverOpen, setNavbarHoverOpen] = useState(false);
  const [navbarResponsive, setNavbarResponsive] = useState(false);
  const profileModule = findModule('profileModule', modules);
  const appNavbarID = 'application_navbar';
  const applicationInfo = {
    author: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    url: (config === null || config === void 0 ? void 0 : config.author.url) || 'https://icatalyst.com',
    name: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    logo: (config === null || config === void 0 ? void 0 : config.author.logo) || 'static/images/logos/logo-shape.png'
  };
  const openText = useLocalization('open');
  const closeText = useLocalization('close');
  const pinText = useLocalization('pin');
  const menuIcon = 'menu';
  const toggleIcons = {
    pinIcon: {
      icon: 'fa thumbtack',
      text: pinText
    },
    closeIcon: {
      icon: 'fa angle-double-left',
      text: closeText
    }
  };
  const [clippedSizes, setClippedSizes] = useState({
    toolbar: 0,
    footer: 0
  });
  const [footerRef] = useHookWithRefCallback(ref => {
    // Only clip if the footer is displayed and outside
    if (ref && layoutProps && layoutProps.footer.display && layoutProps.footer.contentPosition === 'outside') {
      setClippedSizes(sizes => Object.assign(Object.assign({}, sizes), {
        footer: ref.clientHeight || 0
      }));
    }
  }, [layoutProps]);
  const [toolbarRef] = useHookWithRefCallback(ref => {
    var _a, _b;
    // Only clip if the toolbar is displayed and outside
    if (ref && layoutProps && ((_a = layoutProps.toolbar) === null || _a === void 0 ? void 0 : _a.display) && ((_b = layoutProps.toolbar) === null || _b === void 0 ? void 0 : _b.contentPosition) === 'outside') {
      setClippedSizes(sizes => Object.assign(Object.assign({}, sizes), {
        toolbar: ref.clientHeight || 0
      }));
    }
  }, [layoutProps]);
  const definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
  const {
    classes,
    cx
  } = useStyles$b(Object.assign(Object.assign({}, layoutProps || ConsoleLayoutDefaults), {
    mainTheme: definedTheme,
    footerHeight: clippedSizes.footer,
    toolbarHeight: clippedSizes.toolbar,
    navbarHoverOpen: navbarHoverOpen,
    navbarResponsive: navbarResponsive
  }), {
    props: {
      classes: classesProp
    }
  });
  const breakpoint = (definedTheme === null || definedTheme === void 0 ? void 0 : definedTheme.breakpoints.values['lg']) || 400;
  useBreakpoint(isLarger => {
    setNavbarResponsive(!isLarger);
  }, breakpoint, [breakpoint]);
  const contextRoutes = useContextRoutes(routes || [],
  // Note, the +1 is because of the app module route
  layoutProps.navbar.maxDepth + 1);
  if (!layoutProps) {
    return null;
  }
  const {
    toolbar,
    footer,
    navbar,
    contextPanel,
    theme,
    messages
  } = layoutProps;
  const hasContextRoutes = contextRoutes.routes;
  // Extract modules to render in the toolbar
  const ToolbarModuleActions = toolbar.display && toolbar.actions;
  const isDisplayFolded = (navbarResponsive ? !navbar.folded : navbar.folded) && !navbarHoverOpen;
  return jsx(ThemeProvider, Object.assign({
    theme: themes[theme.main]
  }, {
    children: jsxs("div", Object.assign({
      className: cx(classes.root, className),
      style: style
    }, {
      children: [jsx(ThemeProvider, Object.assign({
        theme: themes[theme.dialog]
      }, {
        children: jsx(StateDialog, {})
      })), jsx(AppSnackbar, {
        anchorOrigin: {
          vertical: messages.position.vertical,
          horizontal: messages.position.horizontal
        }
      }), toolbar.display && toolbar.contentPosition === 'outside' && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.toolbar]
      }, {
        children: jsx(AppToolbar, {
          ref: toolbarRef,
          className: cx(classes.appToolbar, classes.appToolbar_outside, classes.appBarOverlay),
          color: toolbar.color,
          elevation: toolbar.elevation,
          titleContent: jsxs("div", Object.assign({
            className: cx(classes.appToolbarTitleWrapper_outside)
          }, {
            children: [jsxs("div", Object.assign({
              className: cx(classes.appToolbarTitle_outside)
            }, {
              children: [jsx(AppLogo, {
                className: cx(classes.appLogo_outside),
                title: (config === null || config === void 0 ? void 0 : config.name) || '',
                logo: (config === null || config === void 0 ? void 0 : config.logo) || ''
              }), navbar.position !== 'toolbar' && jsx(NavbarToggleButton, {
                variant: "animated_simple",
                folded: navbar.folded,
                ariaControls: appNavbarID,
                className: cx(classes.navbarToggleButton_outside),
                icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                icons: toggleIcons,
                actionName: ConsoleLayoutDefaults.name
              })]
            })), navbar.position === 'toolbar' && jsx(AppNavbar, {
              folded: false,
              routes: routes || [],
              variant: "inline",
              showTitleBar: false,
              itemVariant: navbar.navItemVariant,
              navbarItemActiveBorder: navbar.activeItemEmbelish,
              maxDepth: navbar.maxDepth
            })]
          })),
          actionContent: ToolbarModuleActions ? jsx(ToolbarModuleActions, {}) : undefined
        })
      })), navbar.display && navbar.position !== 'toolbar' && navbar.contentPosition === 'outside' && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.navbar]
      }, {
        children: jsx(AppNavbar, Object.assign({
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
          onMouseEnter: () => {
            if (navbar.folded && !navbarResponsive) {
              setNavbarHoverOpen(true);
            }
          },
          onMouseLeave: () => {
            setNavbarHoverOpen(false);
          },
          showTitleBar: !toolbar.display || toolbar.contentPosition !== 'outside',
          itemVariant: navbar.navItemVariant,
          navbarItemActiveBorder: navbar.activeItemEmbelish,
          maxDepth: navbar.maxDepth,
          TitleBarProps: {
            color: navbar.header.color,
            elevation: navbar.header.elevation,
            titleContent: !toolbar.display || toolbar.contentPosition !== 'outside' ? jsx(AppLogo, {
              showTitle: !isDisplayFolded,
              style: {
                marginLeft: isDisplayFolded ? themes[theme.navbar].spacing(2) : 0
              },
              title: (config === null || config === void 0 ? void 0 : config.name) || '',
              logo: (config === null || config === void 0 ? void 0 : config.logo) || ''
            }) : undefined,
            actionContent: isDisplayFolded ? undefined : navbarResponsive ? jsx(NavbarToggleButton, {
              ariaControls: appNavbarID,
              folded: navbar.folded,
              icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
              title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
              icons: toggleIcons,
              actionName: ConsoleLayoutDefaults.name
            }) : jsx(NavbarToggleButton, {
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
          routes: routes || []
        }, {
          children: footer.display && footer.contentPosition === 'inside' && jsx(ThemeProvider, Object.assign({
            theme: themes[theme.footer]
          }, {
            children: jsx(AppFooter, {
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
          }))
        }))
      })), jsxs("div", Object.assign({
        className: cx(classes.appWrapper)
      }, {
        children: [toolbar.display && toolbar.contentPosition === 'inside' && jsx(ThemeProvider, Object.assign({
          theme: themes[theme.toolbar]
        }, {
          children: jsx(AppToolbar, {
            className: cx(classes.appToolbar, classes.appToolbar_inside),
            ref: toolbarRef,
            color: toolbar.color,
            elevation: toolbar.elevation,
            titleContent: navbarResponsive ? jsx(NavbarToggleButton, {
              ariaControls: appNavbarID,
              folded: navbar.folded,
              icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
              title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
              icons: toggleIcons,
              actionName: ConsoleLayoutDefaults.name
            }) : undefined,
            actionContent: ToolbarModuleActions ? jsx(ToolbarModuleActions, {}) : undefined
          })
        })), hasContextRoutes && jsx(ThemeProvider, Object.assign({
          theme: themes[theme.main]
        }, {
          children: jsx(AppNavbar, {
            className: cx(classes.appNavbar),
            routes: contextRoutes.routes || [],
            variant: "panel",
            position: "left",
            classes: {
              drawerContent: cx(classes.appPanelClipped)
            },
            folded: !navbarHoverOpen,
            onMouseEnter: () => {
              if (navbar.folded && !navbarResponsive) {
                setNavbarHoverOpen(true);
              }
            },
            onMouseLeave: () => {
              setNavbarHoverOpen(false);
            },
            showTitleBar: false,
            itemVariant: navbar.navItemVariant,
            navbarItemActiveBorder: navbar.activeItemEmbelish,
            maxDepth: (_a = navbar.contextNav) === null || _a === void 0 ? void 0 : _a.maxDepth,
            PaperProps: {
              style: {
                boxShadow: themes[theme.main].shadows[((_b = navbar.contextNav) === null || _b === void 0 ? void 0 : _b.shadow) || 0]
              }
            }
          })
        })), jsx("div", Object.assign({
          className: cx(classes.contentWrapper, toolbar.contentPosition === 'outside' && classes.contentWrapper_toolbarOutside),
          style: {
            paddingLeft: hasContextRoutes ? navbar.foldedWidth : undefined
          }
        }, {
          children: jsx(ThemeProvider, Object.assign({
            theme: themes[theme.main]
          }, {
            children: jsxs(Fragment, {
              children: [navbarResponsive && !toolbar.display && jsx("div", {
                children: jsx(NavbarToggleButton, {
                  ariaControls: appNavbarID,
                  className: cx(classes.contentNavbarToggle),
                  folded: navbar.folded,
                  icon: isDisplayFolded ? menuIcon : toggleIcons.closeIcon.icon,
                  title: isDisplayFolded ? openText : toggleIcons.closeIcon.text,
                  icons: toggleIcons,
                  actionName: ConsoleLayoutDefaults.name
                })
              }), jsx(Outlet, {})]
            })
          }))
        })), footer.display && footer.contentPosition === 'inside' && jsx(ThemeProvider, Object.assign({
          theme: themes[theme.footer]
        }, {
          children: jsx(AppFooter, {
            className: cx(classes.appFooter, classes.appFooter_inside),
            ref: footerRef,
            color: footer.color,
            elevation: footer.elevation,
            organisationInfo: applicationInfo,
            showOrganisationInfo: false
          })
        }))]
      })), contextPanel.display && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.panel]
      }, {
        children: jsx(AppContextPanel, {
          position: contextPanel.position,
          classes: {
            drawerContent: cx(classes.appPanelClipped)
          }
        })
      })), footer.display && footer.contentPosition === 'outside' && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.footer]
      }, {
        children: jsx(AppFooter, {
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
      }))]
    }))
  }));
}

const CoverLayoutDefaults = {
  name: 'cover',
  theme: {
    main: 'defaultDark',
    content: 'defaultLight',
    panel: 'defaultLight',
    dialog: 'defaultLight',
    footer: 'defaultLight'
  },
  background: {
    image: undefined,
    alpha: 0.05,
    fit: 'cover',
    position: 'center'
  },
  content: {
    elevation: 3
  },
  contextPanel: {
    display: true,
    position: 'right'
  },
  messages: {
    position: {
      vertical: 'bottom',
      horizontal: 'left'
    }
  },
  footer: {
    display: true
  }
};
const useStyles$a = makeStyles()((defaultTheme, layoutConfig) => {
  const theme = layoutConfig.mainTheme || defaultTheme;
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      alignItems: 'center',
      padding: 0
    },
    contentArea: {
      flexGrow: 1,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      padding: theme.spacing(3),
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    },
    content: {
      overflow: 'auto'
    },
    contentWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '100vh',
      [theme.breakpoints.up('sm')]: {
        maxHeight: '90vh',
        width: 'auto'
      }
    }
  };
});
function CoverLayout({
  className,
  style,
  classes: classesProp,
  layoutConfig = CoverLayoutDefaults
}) {
  const [layoutProps] = useLayoutDefinition(layoutConfig || CoverLayoutDefaults);
  const {
    themes = {},
    config
  } = useApplication();
  const applicationInfo = {
    author: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    url: (config === null || config === void 0 ? void 0 : config.author.url) || 'https://icatalyst.com',
    name: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    logo: (config === null || config === void 0 ? void 0 : config.author.logo) || 'static/images/logos/logo-shape.png'
  };
  const definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
  const {
    classes,
    cx
  } = useStyles$a(Object.assign(Object.assign({}, layoutProps), {
    mainTheme: definedTheme
  }), {
    props: {
      classes: classesProp
    }
  });
  if (!layoutProps) {
    return null;
  }
  const {
    theme,
    background,
    content,
    contextPanel,
    messages,
    footer
  } = layoutProps;
  return jsx(ThemeProvider, Object.assign({
    theme: themes[theme.main]
  }, {
    children: jsxs(Container, Object.assign({
      className: cx(classes.root, className),
      style: style,
      imageSrc: background.image,
      imageAlpha: background.alpha,
      imageFit: background.fit,
      imagePosition: background.position,
      square: true
    }, {
      children: [jsxs("div", Object.assign({
        className: cx(classes.contentArea)
      }, {
        children: [jsx(ThemeProvider, Object.assign({
          theme: themes[theme.dialog]
        }, {
          children: jsx(StateDialog, {})
        })), jsx(AppSnackbar, {
          anchorOrigin: {
            vertical: messages.position.vertical,
            horizontal: messages.position.horizontal
          }
        }), contextPanel.display && jsx(ThemeProvider, Object.assign({
          theme: themes[theme.panel]
        }, {
          children: jsx(AppContextPanel, {
            position: contextPanel.position
          })
        })), jsx(ThemeProvider, Object.assign({
          theme: themes[theme.content]
        }, {
          children: jsx("div", Object.assign({
            className: cx(classes.contentWrapper)
          }, {
            children: jsx(Container, Object.assign({
              className: cx(classes.content),
              style: Object.assign(Object.assign({}, style), {
                backgroundColor: themes[theme.content].palette.background.paper
              }),
              elevation: content.elevation
            }, {
              children: jsx(Outlet, {})
            }))
          }))
        }))]
      })), footer.display && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.footer]
      }, {
        children: jsx(AppFooter, {
          elevation: footer.elevation,
          organisationInfo: applicationInfo
        })
      }))]
    }))
  }));
}

const EmptyLayoutDefaults = {
  name: 'empty',
  theme: {
    main: 'defaultDark',
    panel: 'defaultLight',
    dialog: 'defaultLight',
    footer: 'defaultLight'
  },
  contextPanel: {
    display: true,
    position: 'right'
  },
  messages: {
    position: {
      vertical: 'bottom',
      horizontal: 'left'
    }
  },
  footer: {
    display: true
  }
};
const useStyles$9 = makeStyles()((defaultTheme, layoutConfig) => {
  const theme = layoutConfig.mainTheme || defaultTheme;
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
      overflow: 'auto'
    }
  };
});
function EmptyLayout({
  className,
  style,
  classes: classesProp,
  layoutConfig = EmptyLayoutDefaults
}) {
  const {
    themes = {},
    config
  } = useApplication();
  const [layoutProps] = useLayoutDefinition(layoutConfig || EmptyLayoutDefaults);
  const applicationInfo = {
    author: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    url: (config === null || config === void 0 ? void 0 : config.author.url) || 'https://icatalyst.com',
    name: (config === null || config === void 0 ? void 0 : config.author.name) || 'ICatalyst Pte. Ltd.',
    logo: (config === null || config === void 0 ? void 0 : config.author.logo) || 'static/images/logos/logo-shape.png'
  };
  const definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
  const {
    classes,
    cx
  } = useStyles$9(Object.assign(Object.assign({}, layoutProps), {
    mainTheme: definedTheme
  }), {
    props: {
      classes: classesProp
    }
  });
  const {
    theme,
    messages,
    contextPanel,
    footer
  } = layoutProps;
  return jsx(ThemeProvider, Object.assign({
    theme: themes[theme.main]
  }, {
    children: jsxs("div", Object.assign({
      className: cx(classes.root, className),
      style: style
    }, {
      children: [jsx(ThemeProvider, Object.assign({
        theme: themes[theme.dialog]
      }, {
        children: jsx(StateDialog, {})
      })), jsx(AppSnackbar, {
        anchorOrigin: {
          vertical: messages.position.vertical,
          horizontal: messages.position.horizontal
        }
      }), contextPanel.display && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.panel]
      }, {
        children: jsx(AppContextPanel, {
          position: contextPanel.position
        })
      })), jsx("div", Object.assign({
        className: cx(classes.contentWrapper)
      }, {
        children: jsx(Outlet, {})
      })), footer.display && jsx(ThemeProvider, Object.assign({
        theme: themes[theme.footer]
      }, {
        children: jsx(AppFooter, {
          color: footer.color,
          elevation: footer.elevation,
          organisationInfo: applicationInfo
        })
      }))]
    }))
  }));
}

const useStyles$8 = makeStyles()(theme => {
  return {
    root: {
      width: '100%',
      overflow: 'auto',
      flexGrow: 1,
      flexShrink: 1
    },
    root_padded: {
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: 0,
      overflow: 'hidden',
      display: 'flex'
    },
    form: {
      width: '100%',
      flexGrow: 1,
      flexShrink: 1
    },
    formHeader: {
      paddingRight: theme.spacing(2)
    },
    formEntityView: {
      paddingRight: theme.spacing(2)
    },
    formActions: {
      marginTop: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  };
});
function DetailContent({
  className,
  style,
  classes: classesProp,
  model,
  repository,
  onChange,
  onCancel,
  onSubmit,
  isNew = false
}) {
  const {
    classes,
    cx
  } = useStyles$8(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    recordID
  } = useParams();
  const {
    t
  } = useContext(LocalizationContext);
  const [dataState, setDataState] = useState(repository.getState());
  const [data, setData] = useState(null);
  useObservable(repository.getObservable(), setDataState);
  useEffect(() => {
    if (recordID) {
      const subscription = repository.findOne(recordID).subscribe();
      return () => {
        subscription.unsubscribe();
      };
    }
    return () => {
      // Nothing to do here
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordID]);
  const entity = useMemo(() => {
    if (isNew) {
      return model.generateModel();
    } else {
      return dataState.lastRetrieved ? _.cloneDeep(dataState.lastRetrieved) : null;
    }
  }, [dataState.lastRetrieved, isNew, model]);
  const errors = useMemo(() => {
    if (!dataState.errors || dataState.errors.length === 0) {
      return null;
    } else {
      return [...dataState.errors];
    }
  }, [dataState.errors]);
  const DetailComponent = model.detailComponent || EntityViewForm;
  return entity || errors ? jsx("div", Object.assign({
    className: cx(classes.root, !model.detailComponent && classes.root_padded, className),
    style: style
  }, {
    children: jsx(DetailComponent, {
      className: cx(classes.form),
      classes: {
        header: cx(classes.formHeader),
        entityView: cx(classes.formEntityView),
        actionWrapper: cx(classes.formActions)
      },
      model: model,
      value: entity,
      dense: false,
      errors: errors,
      onChange: data => {
        setData(data);
        onChange && onChange(data);
      },
      submit: isNew ? t('save') : t('update'),
      cancel: t('cancel'),
      onSubmit: (e, cb) => {
        if (data) {
          onSubmit(data, cb);
        } else {
          cb && cb();
        }
      },
      onCancel: onCancel,
      actionVariant: "flex",
      variant: "filled"
    })
  })) : jsx(Loader, {});
}

const useStyles$7 = makeStyles()(theme => {
  return {
    root: {},
    table: {},
    grid: {
      padding: theme.spacing(3, 3)
    },
    entityCard: {}
  };
});
function MasterContent({
  className,
  style,
  classes: classesProp,
  model,
  repository,
  onItemClick,
  onSelectionChange,
  onDelete,
  contentRef,
  variant = 'grid'
}) {
  const {
    classes,
    cx
  } = useStyles$7(undefined, {
    props: {
      classes: classesProp
    }
  });
  const {
    t
  } = useContext(LocalizationContext);
  const renderItem = useCallback(data => {
    const id = data[model.identityField];
    const title = data[model.primaryTextField];
    const description = model.secondaryTextField ? data[model.secondaryTextField] : '';
    const featureImage = model.featureImageField ? data[model.featureImageField] : null;
    return jsx(FeatureCard, Object.assign({
      className: cx(classes.entityCard),
      title: title,
      imageSrc: featureImage,
      imageAltText: title,
      onClick: () => {
        onItemClick && onItemClick(data);
      },
      secondaryActions: [{
        title: t('details'),
        icon: 'info'
      }, {
        title: t('delete'),
        icon: 'delete',
        color: 'secondary',
        onClick: e => {
          e.stopPropagation();
          e.preventDefault();
          onDelete && onDelete(data);
        }
      }]
    }, {
      children: description
    }), id);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [model
  // itemComponent
  ]);

  return variant === 'table' ? jsx(RepositoryTable, {
    tableRef: contentRef,
    className: cx(classes.root, classes.table, className),
    style: style,
    model: model,
    repository: repository,
    onRowClick: onItemClick,
    onSelectionChange: onSelectionChange,
    selectable: model.canSelect
  }) : jsx(RepositoryGrid, {
    className: cx(classes.root, classes.grid, className),
    style: style,
    model: model,
    repository: repository,
    itemComponent: renderItem,
    columns: 3
  });
}

const useStyles$6 = makeStyles()(theme => {
  return {
    root: {
      borderBottomWidth: 'thin',
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider
    },
    inputField: {
      maxWidth: theme.spacing(40),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    },
    titleHeader: {
      marginLeft: theme.spacing(-0.5)
    },
    titleHeader_detail: {
      background: 'green'
    }
  };
});
function MasterDetailHeader(_a) {
  var {
      className,
      style,
      classes: classesProp,
      title,
      onAddClick,
      onDeleteClick,
      onBackClick,
      onSearchChange,
      model,
      isModified = false,
      isDetailHeader = false
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "title", "onAddClick", "onDeleteClick", "onBackClick", "onSearchChange", "model", "isModified", "isDetailHeader"]);
  const {
    classes,
    cx
  } = useStyles$6(undefined, {
    props: {
      classes: classesProp
    }
  });
  useParams();
  const canDelete = model.hasPermission(ModelPermission.Delete);
  const canCreate = model.hasPermission(ModelPermission.Create);
  const {
    selected = []
  } = useContext(MasterDetailContext);
  const {
    t
  } = useContext(LocalizationContext);
  return jsx(SectionHeader, Object.assign({}, rest, {
    title: title,
    className: cx(classes.root, className),
    titleAction: isDetailHeader && jsxs("div", Object.assign({
      className: cx(classes.titleHeader)
    }, {
      children: [jsx(IconButton, {
        size: "small",
        icon: "arrow_back",
        onClick: onBackClick
      }), jsx(Typography, Object.assign({
        variant: "caption"
      }, {
        children: model === null || model === void 0 ? void 0 : model.pluralTitle
      }))]
    })),
    actions: !isDetailHeader ? [onSearchChange && (() => jsx(TextField, {
      id: "search",
      className: cx(classes.inputField),
      icon: "search",
      placeholder: `Search ${title}...`,
      variant: "pill",
      size: "small",
      clearable: true,
      onChange: (e, value) => {
        onSearchChange(e, value);
      }
    }, 'searchField')), selected.length === 0 ? canCreate && {
      title: t('Add'),
      icon: 'add',
      color: 'primary',
      onClick: onAddClick
    } : canDelete && {
      title: t('Delete'),
      icon: 'delete',
      color: 'primary',
      onClick: onDeleteClick
    }].filter(i => i) : []
  }));
}

const MasterDetailLayoutDefaults = {
  name: 'masterDetail',
  theme: {
    main: 'defaultLight'
  }
};
const useStyles$5 = makeStyles()(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      padding: 0,
      overflow: 'auto'
    },
    masterHeader: {
      width: '100%',
      padding: theme.spacing(3),
      paddingTop: theme.spacing(4),
      marginBottom: 0
    },
    detailHeader: {
      width: '100%',
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
const MasterDetailContext = createContext({});
const newRoute = '/new';
const detailRoute = '/:recordID';
function MasterDetailLayout({
  className,
  style,
  classes: classesProp,
  layoutConfig = MasterDetailLayoutDefaults,
  repositoryName,
  dataDefinition,
  variant = 'table'
}) {
  const {
    classes,
    cx
  } = useStyles$5(undefined, {
    props: {
      classes: classesProp
    }
  });
  useLayoutDefinition(layoutConfig || MasterDetailLayoutDefaults);
  useApplication();
  const {
    t
  } = useContext(LocalizationContext);
  const parentContext = useContext(MasterDetailContext);
  const navigate = useNavigate();
  const isRootContext = !parentContext;
  const {
    repository: appRepository,
    repositoryDescriptor /*, dataState*/
  } = useApplicationRepository(repositoryName, dataDefinition);
  const contentRef = React.useRef(null);
  const [selected, setSelected] = useState([]);
  const [title, setTitle] = useState('');
  const repository = useMemo(() => {
    return appRepository;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoryDescriptor]);
  const dataState = repository.getState();
  const errors = useMemo(() => {
    return (dataState === null || dataState === void 0 ? void 0 : dataState.errors) && dataState.errors.length > 0 ? dataState.errors.filter(e => {
      // We filter out cancelled errors because of the use string
      return e[0] !== 'canceled';
    }).map(e => ({
      message: t(...e)
    })) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository, dataState]);
  const hasErrors = errors && errors.length > 0;
  const handleSelectionChange = selected => {
    setSelected(selected);
  };
  const handleDetailChange = data => {
    if (repositoryDescriptor.getPrimaryText) {
      setTitle(repositoryDescriptor.getPrimaryText(data) || '');
    }
  };
  const handleDetailCancel = () => {
    navigate('./');
  };
  const handleDelete = useCallback(data => {
    if (!Array.isArray(data)) {
      data = [data];
    }
    // TODO: Before deleting, validate with the user here
    from(data).pipe(filter(entity => {
      return repositoryDescriptor.hasPermission(ModelPermission.Delete, entity);
    }), map(entity => entity[repositoryDescriptor.identityField]), concatMap(entityID => {
      return repository.remove(entityID);
    }), catchError(err => {
      return of(null);
    }), toArray(), tap(res => {
      var _a;
      (_a = contentRef.current) === null || _a === void 0 ? void 0 : _a.toggleRowsSelected(false);
    })).subscribe();
  }, [repository, repositoryDescriptor]);
  const handleItemClick = useCallback(data => {
    if (repositoryDescriptor.canNavigateToDetails) {
      navigate(`./${data.id}`);
    }
  }, [repositoryDescriptor]);
  const handleSubmitNew = useCallback((data, callback) => {
    repository.create(data).pipe(tap(() => {
      callback && callback(null);
      navigate('./');
    }), catchError(err => {
      callback && callback(err);
      return of(null);
    })).subscribe();
  }, [repository, navigate]);
  const handleSubmitUpdate = useCallback((data, callback) => {
    const id = data[repositoryDescriptor.identityField];
    if (id) {
      repository.update(id, data).pipe(tap(() => {
        callback && callback(null);
        navigate('./');
      }), catchError(err => {
        callback && callback(err);
        return of(null);
      })).subscribe();
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [repository, navigate]);
  return dataState && dataState.page.data ? jsx(MasterDetailContext.Provider, Object.assign({
    value: {
      isRootContext: isRootContext,
      selected: selected
    }
  }, {
    children: jsxs(Page, Object.assign({
      className: cx(classes.root, className),
      style: style,
      square: true
    }, {
      children: [jsxs(Routes, {
        children: [jsx(Route, {
          path: newRoute,
          element: jsx(MasterDetailHeader, {
            className: cx(classes.detailHeader),
            icon: repositoryDescriptor.icon,
            isDetailHeader: true,
            model: repositoryDescriptor,
            onBackClick: () => {
              navigate('./');
            },
            title: title
          })
        }), jsx(Route, {
          path: detailRoute,
          element: jsx(MasterDetailHeader, {
            className: cx(classes.detailHeader),
            icon: repositoryDescriptor.icon,
            title: title,
            isDetailHeader: true,
            model: repositoryDescriptor,
            onAddClick: () => {
              navigate(`./new`);
            },
            onBackClick: () => {
              navigate('./');
            }
          })
        }), jsx(Route, {
          index: true,
          element: jsx(MasterDetailHeader, {
            className: cx(classes.masterHeader),
            icon: repositoryDescriptor.icon,
            title: repositoryDescriptor.pluralTitle || '',
            model: repositoryDescriptor,
            onAddClick: () => {
              navigate(`./new`);
            },
            onBackClick: () => {
              navigate('./');
            },
            onDeleteClick: () => {
              handleDelete(selected.map(s => s.original));
            },
            onSearchChange: (e, value) => {
              var _a;
              (_a = contentRef.current) === null || _a === void 0 ? void 0 : _a.onSearchChange(value);
            }
          })
        })]
      }), hasErrors && jsx(ErrorWrapper, {
        className: cx(classes.errorWrapper),
        errors: errors,
        variant: "condensed"
      }), jsxs(Routes, {
        children: [jsx(Route, {
          path: newRoute,
          element: jsx(DetailContent, {
            model: repositoryDescriptor,
            repository: repository,
            isNew: true,
            onChange: handleDetailChange,
            onCancel: handleDetailCancel,
            onSubmit: handleSubmitNew
          })
        }), jsx(Route, {
          path: detailRoute,
          element: jsx(DetailContent, {
            model: repositoryDescriptor,
            repository: repository,
            onChange: handleDetailChange,
            onCancel: handleDetailCancel,
            onSubmit: handleSubmitUpdate
          })
        }), jsx(Route, {
          index: true,
          element: jsx(MasterContent, {
            contentRef: contentRef,
            variant: variant,
            model: repositoryDescriptor,
            repository: repository,
            onSelectionChange: handleSelectionChange,
            onItemClick: handleItemClick,
            onDelete: handleDelete
          })
        })]
      })]
    }))
  })) : jsx(Loader, {
    variant: "circular"
  });
}

const useStyles$4 = makeStyles()((theme, {
  backgroundColor,
  iconColor
}) => {
  var _a, _b;
  // TODO: Need to set up values for inherit and disabled
  const paletteColor = iconColor;
  const color = (_a = mostReadable(backgroundColor, [theme.palette[paletteColor].main, theme.palette[paletteColor].light, theme.palette[paletteColor].dark])) === null || _a === void 0 ? void 0 : _a.toHex8String();
  const textColor = ((_b = mostReadable(backgroundColor, [theme.palette.text.disabled, theme.palette.text.secondary, theme.palette.text.primary, theme.palette.grey[500]])) === null || _b === void 0 ? void 0 : _b.toHex8String()) || theme.palette.text.secondary;
  return {
    root: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
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
      overflow: 'auto',
      // This is zero to ensure that the content is centered if there are no children
      flexGrow: 0,
      flexShrink: 1,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    icon: {
      width: `${theme.spacing(12)}!important`,
      height: `${theme.spacing(12)}!important`,
      fontSize: `${theme.spacing(12)}!important`,
      [theme.breakpoints.up('md')]: {
        width: `${theme.spacing(16)}!important`,
        height: `${theme.spacing(16)}!important`,
        fontSize: `${theme.spacing(16)}!important`
      },
      marginBottom: theme.spacing(4)
    },
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
const InfoPage = forwardRef((_a, ref) => {
  var {
      className,
      style,
      classes: classesProp,
      children,
      title,
      icon,
      excerpt,
      content,
      backgroundColor,
      iconColor = 'primary'
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "children", "title", "icon", "excerpt", "content", "backgroundColor", "iconColor"]);
  const theme = useTheme();
  // icon could be the icon text, or could be a full node
  const iconName = typeof icon === 'string' ? icon : null;
  const excerptText = typeof excerpt === 'string' ? excerpt : null;
  const contentText = typeof content === 'string' ? content : null;
  const [derivedBackground, setDerivedBackground] = useState();
  const [innerRef, setInnerRef] = useState();
  const containerRef = useCallback(node => {
    setDerivedBackground((node === null || node === void 0 ? void 0 : node.backgroundColor) || theme.palette.background.default);
    setInnerRef(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    classes,
    cx
  } = useStyles$4({
    backgroundColor: derivedBackground || theme.palette.background.default,
    iconColor
  }, {
    props: {
      classes: classesProp
    }
  });
  useEffect(() => {
    if (!containerRef || !ref) {
      return;
    }
    if (typeof ref === 'function') {
      ref(innerRef);
    } else {
      ref.current = innerRef;
    }
  }, [innerRef, containerRef, ref]);
  return jsxs(Page, Object.assign({
    className: cx(classes.root, className),
    backgroundColor: backgroundColor,
    style: style,
    verticalAlign: "center",
    horizontalAlign: "center",
    ref: containerRef
  }, rest, {
    children: [
    // Render the IconName or the specified icon Component
    iconName ? jsx(Icon, Object.assign({
      className: cx(classes.icon, classes.iconColorFn),
      color: iconColor
    }, {
      children: iconName
    })) : icon, jsx(Typography, Object.assign({
      variant: "h4",
      component: "h1",
      className: cx(classes.title)
    }, {
      children: title
    })), jsxs("div", Object.assign({
      className: cx(classes.contentScroll)
    }, {
      children: [
      // Render the excerpt text or the specified info Component
      excerptText ? jsx(Typography, Object.assign({
        variant: "subtitle1",
        component: "div",
        className: cx(classes.excerpt, classes.captionColorFn)
      }, {
        children: excerpt
      })) : excerpt,
      // Render the content text or the specified info Component
      contentText ? jsx(Typography, Object.assign({
        variant: "caption",
        component: "div",
        className: cx(classes.content, classes.captionColorFn)
      }, {
        children: content
      })) : content, children && jsx("div", Object.assign({
        className: cx(classes.contentWrapper, classes.captionColorFn)
      }, {
        children: children
      }))]
    }))]
  }));
});

const useStyles$3 = makeStyles()((theme, {
  backgroundColor
}) => {
  var _a;
  const color = (_a = mostReadable(backgroundColor, [theme.palette.primary.main, theme.palette.primary.light, theme.palette.primary.dark])) === null || _a === void 0 ? void 0 : _a.toHex8String();
  return {
    root: {
      width: '100%'
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
function ErrorPage(_a) {
  var {
      className,
      style,
      classes: classesProp,
      children,
      title,
      message,
      linkPath = '/',
      linkText,
      icon = 'error',
      iconColor = 'error'
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "children", "title", "message", "linkPath", "linkText", "icon", "iconColor"]);
  const theme = useTheme();
  const [derivedBackground, setDerivedBackground] = useState();
  const {
    classes,
    cx
  } = useStyles$3({
    backgroundColor: derivedBackground || theme.palette.background.default
  }, {
    props: {
      classes: classesProp
    }
  });
  const containerRef = useCallback(node => {
    setDerivedBackground((node === null || node === void 0 ? void 0 : node.backgroundColor) || theme.palette.background.default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return jsx(InfoPage, Object.assign({
    className: cx(classes.root, className),
    style: style,
    title: title,
    excerpt: message,
    icon: icon,
    ref: containerRef,
    iconColor: iconColor,
    renderNavigation: false,
    content: linkText && jsx(Typography, Object.assign({
      className: cx(classes.linkWrapper)
    }, {
      children: jsx(Link$1, Object.assign({
        className: cx(classes.link, classes.linkColorFn),
        href: linkPath
      }, {
        children: linkText
      }))
    }))
  }, rest, {
    children: children
  }));
}

const useStyles$2 = makeStyles()(theme => {
  return {
    root: {
      padding: 0,
      overflow: 'hidden',
      height: '100%'
    },
    header: {
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      paddingBottom: 0,
      padding: theme.spacing(2),
      paddingRight: 0,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
        paddingBottom: 0,
        paddingRight: theme.spacing(2)
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
        paddingBottom: 0,
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },
    headerDivider: {
      borderBottom: `thin solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      marginBottom: 0,
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(2)
      }
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100%',
      paddingTop: 0,
      overflow: 'auto',
      boxSizing: 'border-box',
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
        paddingRight: theme.spacing(2)
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },
    containerRoot: {}
  };
});
function TitledPage(_a) {
  var {
      className,
      style,
      classes: classesProp,
      children,
      renderNavigation,
      headerSize,
      title,
      actions,
      titleVariant = 'condensed',
      icon,
      iconColor,
      iconTitle,
      onIconClick,
      showDivider = false
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "children", "renderNavigation", "headerSize", "title", "actions", "titleVariant", "icon", "iconColor", "iconTitle", "onIconClick", "showDivider"]);
  const {
    classes,
    cx
  } = useStyles$2(undefined, {
    props: {
      classes: classesProp
    }
  });
  return jsxs(Page, Object.assign({
    className: cx(classes.root, className),
    style: style,
    // Render the navigation in the title instead of the page base
    renderNavigation: false,
    classes: {
      root: cx(classes.containerRoot)
    }
  }, rest, {
    children: [jsx(SectionHeader, {
      className: cx(classes.header, showDivider && classes.headerDivider),
      title: title,
      size: headerSize,
      actions: actions,
      variant: titleVariant,
      icon: icon,
      iconColor: iconColor,
      iconTitle: iconTitle,
      onIconClick: onIconClick
    }), jsx("div", Object.assign({
      className: cx(classes.content)
    }, {
      children: children
    }))]
  }));
}

const useStyles$1 = makeStyles()(( /*theme*/
) => {
  return {
    root: {},
    container: {
      flexGrow: 1
    }
  };
});
function WebPage(_a) {
  var {
      className,
      style,
      classes: classesProp,
      title,
      src,
      sandbox
    } = _a,
    rest = __rest(_a, ["className", "style", "classes", "title", "src", "sandbox"]);
  const {
    classes,
    cx
  } = useStyles$1(undefined, {
    props: {
      classes: classesProp
    }
  });
  return jsx(TitledPage, Object.assign({
    className: cx(classes.root, className),
    style: style,
    title: title
  }, rest, {
    children: jsx(WebContainer, {
      className: cx(classes.container),
      title: title,
      src: src,
      sandbox: sandbox
    })
  }));
}

const SettingsLayoutDefaults = {
  name: 'settings',
  theme: {
    main: 'defaultLight',
    panel: 'defaultLight'
  }
};
const useStyles = makeStyles()((defaultTheme, layoutConfig) => {
  const theme = layoutConfig.mainTheme || defaultTheme;
  return {
    root: {},
    settingsPanel: {
      flexGrow: 1,
      alignSelf: 'center',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        maxWidth: `${theme.breakpoints.values.sm}px`
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: `${theme.breakpoints.values.md}px`
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: `${theme.breakpoints.values.lg}px`
      }
    },
    background_override: {
      background: theme.palette.background.default
    }
  };
});
function SettingsLayout({
  className,
  style,
  classes: classesProp,
  layoutConfig = SettingsLayoutDefaults,
  repositoryName,
  dataDefinition,
  categories,
  settingsID
}) {
  const {
    themes = {},
    config
  } = useApplication();
  const {
    t
  } = useContext(LocalizationContext);
  const [layoutProps] = useLayoutDefinition(layoutConfig || SettingsLayoutDefaults);
  const dispatch = useDispatch();
  const definedTheme = layoutProps ? themes[layoutProps.theme.main] : undefined;
  const [data, setData] = useState(null);
  const {
    repository: settingsRepository,
    dataState
  } = useApplicationRepository(repositoryName, dataDefinition);
  const refreshData = useCallback(recordID => {
    // TODO: ?admin=true is a legacy thing, this needs to be updated on Singularity to remove the need
    settingsRepository.findOne(`${recordID}?admin=true`).pipe(
    // take(1) will automatically unsubscribe
    take(1)).subscribe(response => {
      setData(response);
    });
  }, []);
  useEffect(() => {
    if (settingsID) {
      refreshData(settingsID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsID]);
  const {
    classes,
    cx
  } = useStyles(Object.assign(Object.assign({}, layoutProps), {
    mainTheme: definedTheme
  }), {
    props: {
      classes: classesProp
    }
  });
  const {
    theme
  } = layoutProps;
  return jsx(ThemeProvider, Object.assign({
    theme: themes[theme.main]
  }, {
    children: jsxs(TitledPage, Object.assign({
      className: cx(classes.root, className),
      classes: {
        content: cx(classes.background_override),
        header: cx(classes.background_override)
      },
      style: style,
      square: true,
      title: t('Settings'),
      icon: "settings",
      showDivider: true
    }, {
      children: [dataState.lastRetrieved && jsx(Settings, {
        className: cx(classes.settingsPanel),
        categories: categories,
        onSubmit: (e, data, callback) => {
          delete data['created'];
          delete data['createdby'];
          delete data['modified'];
          delete data['modifiedby'];
          settingsRepository.update(settingsID, data).pipe(tap(response => {
            dispatch(ACTIONS.message.showMessage({
              message: t('Settings updated'),
              variant: 'success',
              autoHideDuration: 1000
            }));
            setData(response);
            callback && callback();
          }), catchError(err => {
            console.log(err);
            callback && callback(err);
            return of(null);
          })).subscribe();
        },
        value: data
      }), !data && jsx(Loader, {})]
    }))
  }));
}

export { AppContextPanel, AppFooter, AppNavbar, AppSnackbar, AppToolbar, AppUserInfo, Chat, ConsoleLayout, ConsoleLayoutDefaults, CoverLayout, CoverLayoutDefaults, EmptyLayout, EmptyLayoutDefaults, ErrorPage, InfoPage, MasterDetailContext, MasterDetailLayout, MasterDetailLayoutDefaults, MultiUserCanvas, SettingsLayout, SettingsLayoutDefaults, TitledPage, WebPage, useLayoutDefinition };
