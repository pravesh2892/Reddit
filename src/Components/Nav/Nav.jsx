import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import {
  BsArrowBarLeft,
  BsArrowUpRightCircle,
  BsChevronDown,
  BsQrCodeScan,
  BsQuestionLg,
  BsShield,
} from "react-icons/bs";
import { CgLogIn, CgProfile } from "react-icons/cg";
import { CiCircleMore, CiCoinInsert } from "react-icons/ci";
import { FaReddit } from "react-icons/fa";
import { FcAdvertising } from "react-icons/fc";
import { FiFileText } from "react-icons/fi";
import { GiAlienSkull } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import NavMenu from "../NavMenu/NavMenu.jsx";
import { arr } from "../NavMenuArray";
import { initialPosts } from "../initialPosts";
import "./Nav.css";
import { AddAPhoto, Translate } from "@mui/icons-material";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../BASE_URL";
const style = {
  border: "1px solid var(--color-border)",
  borderRadius: " 3px",
  cursor: "pointer",
};
const Option = () => {
  const {
    login,
    setLogin,
    setShowForm,
    theme,
    setTheme,
    setNavMenu,
    userId,
    setUserId,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!login) {
      setShowForm("Login");
      return;
    }
    setLogin(false);
    const obj = {};
    try {
      await axios.post(`${BASE_URL}/api/v1/user/logout`, { userId });

      setLogin(false);
      localStorage.setItem("reddit_token", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
    // localStorage.setItem("reddit_google", JSON.stringify(obj));
  };
  const handleTheme = () => {
    setTheme((p) => (p == "light-theme" ? "dark-theme" : "light-theme"));
  };
  return (
    <div className="reddit_clone-nav_option">
      {/* <button
        onClick={() => {
          navigate("/profile");
        }}
      >
        <CgProfile /> Profile
      </button> */}

      <button
        onClick={() => {
          navigate("/coins");
          setNavMenu(arr[7]);
        }}
      >
        <CiCoinInsert className="reddit_clone-nav_menu_icons" /> Coins
      </button>
      <button
        onClick={() => {
          navigate("/premium");
          setNavMenu(arr[8]);
        }}
      >
        <BsShield className="reddit_clone-nav_menu_icons" /> Premium
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <BsQuestionLg /> Help Center
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <CiCircleMore /> More
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <FiFileText /> Terms And Policies
      </button>
      <button onClick={() => navigate("/comingpage")}>
        <FcAdvertising /> Advertise on Reddit
      </button>
      <button onClick={handleLogin}>
        <CgLogIn /> LogIn & LogOut
      </button>
    </div>
  );
};
const NavIcon = ({ userName, option, setOption }) => {
  const navigate = useNavigate();
  const optionRef = useRef();
  const { setNavMenu } = useContext(MyContext);

  const { userPhoto, setNewPost } = useContext(MyContext);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleOptions = () => {
    setOption((p) => !p);
  };
  return (
    <div className="reddit_clone-nav_icons">
      <div className="reddit_clone-nav_icons_item">
        <button
          onClick={() => {
            navigate("/messages");
            setNavMenu(arr[4]);
          }}
        >
          <AiOutlineMessage />
        </button>
        <button
          onClick={() => {
            navigate("/");
            setNavMenu(arr[5]);

            setNewPost(true);
          }}
        >
          <AiOutlinePlus />{" "}
        </button>
        <button
          onClick={() => {
            navigate("/notification");
            setNavMenu(arr[6]);
          }}
        >
          <IoIosNotificationsOutline />
        </button>

        <button onClick={() => navigate("/comingpage")}>
          <FcAdvertising /> <p>Advertise</p>
        </button>
      </div>
      <div
        className="reddit_clone-nav_username"
        onClick={handleOptions}
        ref={optionRef}
      >
        <div className="reddit_clone-nav_username_item">
          <div className="reddit_clone-nav_username_userphoto">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt=""
                style={{
                  maxWidth: "2rem",
                  maxHeight: "2rem",
                }}
              />
            ) : (
              <GiAlienSkull />
            )}
          </div>
          <div className="reddit_clone-nav_username_user">
            {" "}
            <p>{userName ? userName : ""}</p>
          </div>
        </div>
        <BsChevronDown />
        {option && <Option />}
      </div>
    </div>
  );
};

const Nav = () => {
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const [navMenuWidth, setNavMenuWidth] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 1200);
  const [border, setBorder] = useState();

  const {
    login,
    setShowForm,
    theme,
    setTheme,
    userName,
    setIsAllPage,
    menu,
    setMenu,
    navMenu,
    setNavMenu,
    setNewPost,
    setQr,
    apiPosts,
    setApiPosts,
    update,
    filterPost,
    setFilterPost,
    search,
    setSearch,
    pseudoPost,
  } = useContext(MyContext);
  const optionRef = useRef();

  useEffect(() => {
    const w = document.querySelector(".reddit_clone-nav_menu_btn").offsetWidth;
    setNavMenuWidth(w);
    const handleResize = () => {
      setMenu(parseFloat(window.innerWidth) > 1200);

      setWindowWidth(parseFloat(window.innerWidth) > 1200);
    };
    window.addEventListener("resize", handleResize);
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseIn = () => {
    if (!menu) {
      setBorder(style);
    }
  };
  const handleLeave = () => {
    if (border) {
      setBorder();
    }
  };
  const handleClick = () => {
    setShowForm("Login");
  };
  const handleInput = (e) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      setFilterPost([]);
      return;
    }
    const arr = apiPosts.filter((item) =>
      item?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const brr = update.filter((item) =>
      item?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const crr = initialPosts.filter((item) =>
      item?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const drr = pseudoPost.filter((item) =>
      item?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterPost([...drr, ...arr, ...brr, ...crr]);
  };
  return (
    <div className="reddit_clone-nav_fixed">
      <div className="reddit_clone-nav">
        <div className="reddit_clone-nav_icon">
          <div
            className="reddit_clone-nav_reddit_name"
            onClick={() => {
              navigate("/");
              setNewPost(false);
              setNavMenu(arr[0]);
              setFilterPost([]);
            }}
          >
            <FaReddit className="reddit_clone-nav_reddit_icon" />

            <svg
                className="reddit-logo"
                viewBox="0 0 57 18"
                height="35"
                width="72"
                xmlns="http://www.w3.org/2000/svg"
               style={{marginLeft:"8px"}}
               
              >
                <g fill="currentColor">
                  <path d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z"></path>
                  <circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12"></circle>
                  <path d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z"></path>
                  <path d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path>
                  <path d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z"></path>
                  <path d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z"></path>
                  <path d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z"></path>
                </g>
              </svg>
          </div>
          <div className="reddit_clone-nav_menu">
            <button
              className="reddit_clone-nav_menu_btn"
              onClick={() => {
                  menu === false ? setShowMenu((p) => !p) : "";
              }}
              onMouseEnter={handleMouseIn}
              onMouseLeave={handleLeave}
              style={border}
            >
              {navMenu ? navMenu : false}{" "}
              <div>
                {menu === false && showMenu && windowWidth && (
                  <BsArrowBarLeft onClick={() => setMenu(true)} />
                )}
                <BsChevronDown />{" "}
              </div>
            </button>
            {showMenu && (
              <div>{menu ? <></> : <NavMenu width={navMenuWidth} />}</div>
            )}
          </div>
        </div> 
        <div className="reddit_clone-nav_input">
          <div className="reddit_clone-nav_input_item">
            <input
              type="text"
              placeholder="🔍 Search Reddit"
              value={search}
              onChange={handleInput}
            />
          </div>
          {login && (
            <div className="reddit_clone-mid_icons">
              <button
                onClick={() => {
                  navigate("/popular");
                  setNavMenu(arr[1]);
                  setIsAllPage(false);
                }}
              >
                <BsArrowUpRightCircle />{" "}
              </button>
              <button
                onClick={() => {
                  navigate("/coins");
                  setNavMenu(arr[7]);
                }}
              >
                <CiCoinInsert />{" "}
              </button>
            </div>
          )}
        </div>
        {/* <hr /> */}
        {login ? (
          <NavIcon userName={userName} option={option} setOption={setOption} />
        ) : (
          <div className="reddit_clone-nav_login_part">
            <button
              className="reddit_clone-nav_getapp"
              onClick={() => setQr((p) => !p)}
            >
              {" "}
              <BsQrCodeScan /> Get App
            </button>
            <button className="reddit_clone-nav_login" onClick={handleClick}>
              <BiLogIn /> Login
            </button>
            <div
              className="reddit_Clone-nav_before_login"
              onClick={() => setOption((p) => !p)}
              ref={optionRef}
            >
              <HiDotsHorizontal className="reddit_clone-contact_icon" />
              {/* <BsChevronDown /> */}
              {option && <Option />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
