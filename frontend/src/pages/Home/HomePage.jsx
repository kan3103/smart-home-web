import {React} from "react";
import Card from "../../component/Home/Card.jsx";
// import Lock from "../../component/Home/Lock.jsx";
import Next from "../../component/Home/Next.jsx";
import Add from "../../component/Home/Add.jsx";
// import DropDown from "../../component/Home/DropDown.jsx";
import Weather from "../../component/Home/Weather.jsx";
import Notify from "../Home/component/Notify"
import Members from "./component/Members";
import Chart from "./component/Chart";
// import Camera from "./component/Camera";
import HelpWidget from "./component/HelpWidget";
import SlideBar from "./component/SlideBar";
import DeviceSensor from "./component/DeviceSensor";
import Header from "./component/Header";
import DeviceControl from "./component/DeviceControl";


export const HomePage = () => {
        return (
        <div className="bg-[#f3f3f3] flex flex-row justify-center w-full">
            <div className="bg-[#f3f3f3] w-[1512px] h-[982px]">
                <div className="relative w-[1510px] h-[982px]">

                    {/*This is the Notify component*/}
                    <Notify/>
                    <div className="absolute top-[95px] left-[1067px] flex items-center [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-xl tracking-[0.20px] leading-[normal] whitespace-nowrap">
                        Notification
                        <div className="relative z-10 ml-[253px]">
                            <Next/>
                        </div>
                    </div>

                    {/*This is the Members component*/}
                    <Members/>
                    <div className="absolute top-[463px] left-[1067px] flex items-center [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-xl tracking-[0.20px] leading-[normal] whitespace-nowrap">
                        Members
                        <div className="relative z-10 ml-[282px]">
                            <Next/>
                        </div>
                    </div>

                    <div className="absolute top-[661px] left-[1067px] flex items-center [font-family:'Roboto-Bold',Helvetica] font-bold text-[#000000] text-xl tracking-[0.20px] leading-[normal] whitespace-nowrap">
                        Power Consumption
                        <div className="relative z-10 ml-[174px]">
                            <Next/>
                        </div>
                    </div>

                    {/*This is the Header component*/}
                    <Header/>


                    <div className="inline-flex flex-col w-[80px] h-[918px] items-center gap-[38px] pt-[30px] pb-[300px] px-[25px] relative z-10 top-16 left-0 bg-white">
                        <Card />
                    </div>


                    <div className="absolute w-[230px] h-[212px] top-[655px] left-[790px] bg-[#d9d9d9] rounded-[15px]" >
                        <Weather/>
                    </div>

                    {/*This is the SlideBar component*/}
                    <div className="absolute w-[890px] h-[823px] top-[109px] left-[116px]">
                        <SlideBar/>

                        <div className="relative z-10 w-[105px] h-[30px] top-[347px] left-[1140px]">
                            <Add/>
                        </div>

                        {/*<div className="absolute w-[230px] h-[643px] top-[387px] left-[206px] bg-[#d9d9d9] rounded-[15px] rotate-[90.00deg]" >*/}
                        {/*</div>*/}

                        {/*<Camera/>*/}

                        {/*This is the HelpWidget component*/}
                        <HelpWidget/>

                        {/*This is the DeviceSensor component*/}
                        <DeviceSensor/>

                        {/*<div className="absolute w-[354px] h-[158px] top-[215px] left-[550px] bg-gradient-to-b from-sky-500  rounded-[25px]">*/}

                        {/*    <div className="absolute w-[39px] h-[39px] top-[10px] left-3 ">*/}
                        {/*        <DropDown/>*/}
                        {/*    </div>*/}

                        {/*    <div className="left-[200px] absolute top-6 ">*/}
                        {/*        <Add/>*/}
                        {/*    </div>*/}

                        {/*    <div className="left-[230px] absolute top-[80px]">*/}
                        {/*        <Lock/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>


                    <div className="absolute w-[417px] h-[245px] top-[698px] left-[1067px] bg-white rounded-[15px]">
                        {/*This is the Chart component*/}
                        <Chart/>

                        <div className="top-[35px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            450
                        </div>

                        <div className="top-16 absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            400
                        </div>

                        <div className="top-[93px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            350
                        </div>

                        <div className="top-[121px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            300
                        </div>

                        <div className="top-[178px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            200
                        </div>

                        <div className="top-[150px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            250
                        </div>

                        <div className="top-[207px] absolute h-3.5 left-[22px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px] whitespace-nowrap">
                            150
                        </div>

                        <div className="absolute w-6 h-3.5 top-[228px] left-[61px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Mon
                        </div>

                        <div className="absolute w-5 h-3.5 top-[228px] left-[113px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Tue
                        </div>

                        <div className="absolute w-[22px] h-3.5 top-[228px] left-[163px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Wed
                        </div>

                        <div className="absolute w-[26px] h-3.5 top-[228px] left-[215px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Thus
                        </div>

                        <div className="absolute w-3.5 h-3.5 top-[228px] left-[269px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Fri
                        </div>

                        <div className="absolute w-[21px] h-3.5 top-[228px] left-[359px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Sun
                        </div>

                        <div className="absolute w-[18px] h-3.5 top-[228px] left-[312px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-[#82899b] text-[11px] tracking-[0.11px] leading-[14px]">
                            Sat
                        </div>
                    </div>

                    {/*This is the DeviceControl component*/}
                    <DeviceControl/>

                    <div className="absolute w-[166px] h-[158px] top-[680px] left-[650px] rounded-[15px]">
                        <Next/>
                    </div>
                </div>
            </div>
        </div>
    );

};



export default HomePage;
