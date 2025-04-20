import { useState ,useEffect} from "react";
import home1 from "../../../assets/images/home/home1.png";
import lock from "../../../assets/images/icon/lock.png";
import unlock from "../../../assets/images/icon/unlock.png";
import Home_Temp from "../../../hooks/webSocket";
const SlideBar = () => {
    const [temperature, humidity, door] = Home_Temp();
    const [isLocked, setIsLocked] = useState(true);

    return (
        <div className="w-full bg-white rounded-[15px] p-6 shadow-md flex justify-between items-center relative">
            {/* Phần Chào Mừng */}
            <div>
                <h2 className="text-xl font-bold">Hello, Host!</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Welcome home, air quality is good and fresh. Take a walk and have a coffee.
                </p>
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm font-semibold">
                        Your Door is <span className={door? (door.value ==="0" ? "text-red-500" : "text-green-500"):"text-red-500"}>{door?(door.value ==="0" ? "Locked" : "Unlocked"):"Locked"}!</span>
                    </span>
                </div>
                {/* Nút khóa/mở khóa */}
                <button 
                    onClick={() => setIsLocked(!isLocked)}
                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#6b6bf9] text-white font-bold rounded-lg border border-black transition-transform transform hover:scale-105 active:scale-95"
                >
                    <img className="w-4 h-4" src={door?(door.value ? lock : unlock):lock} alt="Lock Icon" />
                    {door?(door.value === "0"? "Locked" : "Unlocked"):"Locked"}
                </button>
            </div>

            {/* Hình ảnh ngôi nhà */}
            <img className="w-[180px] h-[140px]" src={home1} alt="Home" />
        </div>
    );
};

export default SlideBar;
