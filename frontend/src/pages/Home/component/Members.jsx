import React from "react";
import avatar1 from "../../../assets/images/home/avatar1.png";
import avatar2 from "../../../assets/images/home/avatar2.png";
import avatar3 from "../../../assets/images/home/avatar3.png";
import avatar4 from "../../../assets/images/home/avatar4.png";

const Members = () => (
    <div className="absolute w-[417px] h-[130px] top-[500px] left-[1067px] bg-white rounded-[15px]">
        <div className="inline-flex items-start gap-[15px] relative top-[23px] left-5">
            <div className="inline-flex flex-col items-center justify-center gap-1.5 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-end justify-end relative flex-[0_0_auto]">
                    <img
                        className="relative w-[45px] h-[45px]"
                        alt="Group"
                        src={avatar3}
                    />
                </div>

                <div className="flex flex-col w-[83px] items-center justify-center gap-[3px] relative flex-[0_0_auto]">

                    <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] font-lato-medi-14 font-[number:var(--lato-medi-14-font-weight)] text-darktheme-black-bg text-[length:var(--lato-medi-14-font-size)] text-center tracking-[var(--lato-medi-14-letter-spacing)] leading-[var(--lato-medi-14-line-height)] [font-style:var(--lato-medi-14-font-style)]">
                            Member1
                        </div>
                    </div>

                    <div className="relative self-stretch [font-family:'Lato-Medium',Helvetica] font-medium text-black-40 text-[11px] text-center tracking-[0] leading-[normal]">
                        Partial Access
                    </div>
                </div>
            </div>

            <div className="inline-flex flex-col items-center justify-center gap-1.5 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-end justify-end relative flex-[0_0_auto]">
                    <img
                        className="relative w-[45px] h-[45px]"
                        alt="Group"
                        src={avatar2}
                    />
                </div>

                <div className="flex flex-col w-[83px] items-center justify-center gap-[3px] relative flex-[0_0_auto]">
                    <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] font-lato-medi-14 font-[number:var(--lato-medi-14-font-weight)] text-darktheme-black-bg text-[length:var(--lato-medi-14-font-size)] text-center tracking-[var(--lato-medi-14-letter-spacing)] leading-[var(--lato-medi-14-line-height)] [font-style:var(--lato-medi-14-font-style)]">
                            Host
                        </div>
                    </div>

                    <div className="relative self-stretch [font-family:'Lato-Medium',Helvetica] font-medium text-black-40 text-[11px] text-center tracking-[0] leading-[normal]">
                        Admin
                    </div>
                </div>
            </div>

            <div className="inline-flex flex-col items-center justify-center gap-1.5 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-end justify-end relative flex-[0_0_auto]">
                    <img
                        className="relative w-[45px] h-[45px]"
                        alt="Group"
                        src={avatar4}
                    />
                </div>

                <div className="flex flex-col w-[83px] items-center justify-center gap-[3px] relative flex-[0_0_auto]">
                    <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] font-lato-medi-14 font-[number:var(--lato-medi-14-font-weight)] text-darktheme-black-bg text-[length:var(--lato-medi-14-font-size)] text-center tracking-[var(--lato-medi-14-letter-spacing)] leading-[var(--lato-medi-14-line-height)] [font-style:var(--lato-medi-14-font-style)]">
                            Member2
                        </div>
                    </div>

                    <div className="relative self-stretch [font-family:'Lato-Medium',Helvetica] font-medium text-black-40 text-[11px] text-center tracking-[0] leading-[normal]">
                        Partial Access
                    </div>
                </div>
            </div>

            <div className="inline-flex flex-col items-center justify-center gap-1.5 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-end justify-end relative flex-[0_0_auto]">
                    <img
                        className="relative w-[45px] h-[45px]"
                        alt="Group"
                        src={avatar1}
                    />
                </div>

                <div className="flex flex-col w-[83px] items-center justify-center gap-[3px] relative flex-[0_0_auto]">
                    <div className="flex items-center justify-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative flex-1 mt-[-1.00px] font-lato-medi-14 font-[number:var(--lato-medi-14-font-weight)] text-darktheme-black-bg text-[length:var(--lato-medi-14-font-size)] text-center tracking-[var(--lato-medi-14-letter-spacing)] leading-[var(--lato-medi-14-line-height)] [font-style:var(--lato-medi-14-font-style)]">
                            Member3
                        </div>
                    </div>

                    <div className="relative self-stretch [font-family:'Lato-Medium',Helvetica] font-medium text-black-40 text-[11px] text-center tracking-[0] leading-[normal]">
                        Partial Access
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Members;