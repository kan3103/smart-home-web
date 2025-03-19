import React from "react";
import home2 from "../../../assets/images/home/home2.png";
import avatar1 from "../../../assets/images/home/avatar1.png";
import voiceAssistant from "../../../assets/images/home/voiceAssistant.png";
import avatar2 from "../../../assets/images/home/avatar2.png";

const Notification = () => (
    <div className="flex absolute w-[417px] h-[304px] top-[132px] left-[1067px] bg-white rounded-[15px] overflow-y-auto custom-scrollbar">
        <div className="inline-flex flex-col items-start gap-4 relative top-5 left-[30px]">
            <div className="flex w-[335px] items-center gap-[15px] relative flex-[0_0_auto]">
                <img
                    className="relative w-[25px] h-[25px] object-cover"
                    alt="Lightning"
                    src={home2}
                />
                <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                    <div className="flex flex-col items-start gap-1 pl-0 pr-2.5 pt-0 pb-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                        <p className="relative self-stretch mt-[-1.00px] opacity-80 font-lato-reg-12 font-[number:var(--lato-reg-12-font-weight)] text-darktheme-black-bg text-[length:var(--lato-reg-12-font-size)] tracking-[var(--lato-reg-12-letter-spacing)] leading-[var(--lato-reg-12-line-height)] [font-style:var(--lato-reg-12-font-style)]">
                            Pay the electricity bill before Aug 3rd
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-end gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex w-[335px] items-start gap-[15px] relative flex-[0_0_auto]">
                    <img
                        className="relative w-5 h-5 object-cover"
                        alt="Avatar"
                        src={avatar1}
                    />
                    <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                        <div className="flex flex-col items-start gap-1 pl-0 pr-2.5 pt-0 pb-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                            <p className="relative self-stretch mt-[-1.00px] opacity-80 font-lato-reg-12 font-[number:var(--lato-reg-12-font-weight)] text-darktheme-black-bg text-[length:var(--lato-reg-12-font-size)] tracking-[var(--lato-reg-12-letter-spacing)] leading-[var(--lato-reg-12-line-height)] [font-style:var(--lato-reg-12-font-style)]">
                                Member1 requesting for unlocking the main door
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex w-[302px] items-start justify-end gap-2 relative flex-[0_0_auto]">
                    <div className="w-[299px] flex flex-col items-start gap-2 relative">
                        <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex w-[106px] h-7 items-center justify-center gap-2.5 relative rounded-[5px] border border-solid border-[#000000] opacity-60">
                                <div className="relative w-fit [font-family:'Roboto-Bold',Helvetica] font-bold text-[#1f1f1f] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                                    Decline
                                </div>
                            </div>
                            <div className="flex w-[106px] h-7 items-center justify-center gap-2.5 relative bg-[#6b6bf9] rounded-[5px]">
                                <div className="relative w-fit [font-family:'Roboto-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                                    Unlock
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-[335px] items-center gap-[15px] relative flex-[0_0_auto]">
                <img
                    className="relative w-[25px] h-[25px] object-cover"
                    alt="Voice assistant"
                    src={voiceAssistant}
                />
                <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                    <div className="flex flex-col items-start gap-1 pl-0 pr-2.5 pt-0 pb-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                        <p className="relative self-stretch mt-[-1.00px] opacity-80 font-lato-reg-12 font-[number:var(--lato-reg-12-font-weight)] text-darktheme-black-bg text-[length:var(--lato-reg-12-font-size)] tracking-[var(--lato-reg-12-letter-spacing)] leading-[var(--lato-reg-12-line-height)] [font-style:var(--lato-reg-12-font-style)]">
                            Voice Assist is about to die - low battery 2%
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-end gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex w-[335px] items-start gap-[15px] relative flex-[0_0_auto]">
                    <img
                        className="relative w-5 h-5 object-cover"
                        alt="Avatar"
                        src={avatar1}
                    />
                    <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                        <div className="flex flex-col items-start gap-1 pl-0 pr-2.5 pt-0 pb-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                            <p className="relative self-stretch mt-[-1.00px] opacity-80 font-lato-reg-12 font-[number:var(--lato-reg-12-font-weight)] text-darktheme-black-bg text-[length:var(--lato-reg-12-font-size)] tracking-[var(--lato-reg-12-letter-spacing)] leading-[var(--lato-reg-12-line-height)] [font-style:var(--lato-reg-12-font-style)]">
                                Member1 added someone to access the home, Please update the status
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-[299px] items-start justify-end gap-2 relative flex-[0_0_auto]">
                    <div className="relative w-[3px] h-[55px] bg-[#6b6bf9] opacity-50" />
                    <img
                        className="relative w-[19px] h-[19px] object-cover"
                        alt="Avatart"
                        src={avatar2}
                    />

                    <div className="flex-1 grow flex flex-col items-start gap-2 relative">
                        <div className="flex items-center gap-1.5 pl-0 pr-2.5 pt-0 pb-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                            <div className="relative w-fit mt-[-1.00px] font-lato-bold-14 font-[number:var(--lato-bold-14-font-weight)] text-darktheme-black-bg text-[length:var(--lato-bold-14-font-size)] tracking-[var(--lato-bold-14-letter-spacing)] leading-[var(--lato-bold-14-line-height)] [font-style:var(--lato-bold-14-font-style)]">
                                Sanjay Dut
                            </div>

                            <div className="relative flex-1 [font-family:'Lato-SemiBold',Helvetica] font-semibold text-[#6b6bf9] text-[10px] tracking-[0] leading-[normal]">
                                View Profile
                            </div>
                        </div>
                        <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex w-[106px] h-7 items-center justify-center gap-2.5 relative rounded-[5px] border border-solid border-[#000000] opacity-60">
                                <div className="relative w-fit [font-family:'Roboto-Bold',Helvetica] font-bold text-[#1f1f1f] text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                                    Decline
                                </div>
                            </div>

                            <div className="flex w-[106px] h-7 items-center justify-center gap-2.5 relative bg-[#6b6bf9] rounded-[5px]">
                                <div className="relative w-fit [font-family:'Roboto-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                                    Approve
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Notification;