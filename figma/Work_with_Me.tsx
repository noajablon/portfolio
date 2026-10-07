const imgNegative = "https://www.figma.com/api/mcp/asset/04e992bd-867e-4e72-b9e8-32689f9143e4.svg";
const imgPart1 = "https://www.figma.com/api/mcp/asset/62227581-0488-42f5-b190-54517ef14ecb.png";
const imgPart2 = "https://www.figma.com/api/mcp/asset/ac4c60a6-8636-4170-b5d3-1af4fc00adb1.png";
import { motion } from "motion/react";
const imgUntitled32 = "https://www.figma.com/api/mcp/asset/f143a0af-5773-42b4-bfcd-9eaf99f7db09.png";
const imgShape22 = "https://www.figma.com/api/mcp/asset/d4a1349d-480c-452a-9892-8758ac419a48.png";
const imgChatGptImageSep262026100630Pm2 = "https://www.figma.com/api/mcp/asset/8236b4ea-ac17-41f3-95fd-2905e302b570.png";
const imgImage1 = "https://www.figma.com/api/mcp/asset/9d330624-b575-44d5-8d1c-b2dcefae076b.png";
const imgRectangle38 = "https://www.figma.com/api/mcp/asset/6ce3e111-0d8e-41eb-9ce9-179efe3b3a6d.svg";
const imgVector111 = "https://www.figma.com/api/mcp/asset/73609fcc-5c3d-4d1c-bc09-67156a3f9eaa.svg";
const imgVector39 = "https://www.figma.com/api/mcp/asset/59d5f31a-a915-4edd-8a7a-22a74b1a7df3.svg";
const imgVector124 = "https://www.figma.com/api/mcp/asset/073da650-52d8-453e-8393-6c239b9c4ddd.svg";
const imgLine3 = "https://www.figma.com/api/mcp/asset/d2a7d18d-93d4-4aa8-8bb9-2d91d73cd3f7.svg";
const imgVector112 = "https://www.figma.com/api/mcp/asset/d0897823-bf87-4d69-82b9-c53ed2ccbe76.svg";
const imgGroup34 = "https://www.figma.com/api/mcp/asset/8630de24-1e1f-425d-b31c-2995d713056a.svg";
const imgNegative1 = "https://www.figma.com/api/mcp/asset/0230856d-265a-43a9-ab03-ca976a14ea67.svg";
const imgVector127 = "https://www.figma.com/api/mcp/asset/a790f6a5-2961-4ab6-9500-d56fe38263d7.svg";
const imgGroup16 = "https://www.figma.com/api/mcp/asset/af3179cb-ab5c-4456-9f85-36a6507b6b16.svg";
const imgLayer1 = "https://www.figma.com/api/mcp/asset/7c0d8b83-d0b9-4228-9ef3-04521e080893.svg";
const imgLayer2 = "https://www.figma.com/api/mcp/asset/ffb6279b-c20c-4c95-a833-d168b3d05290.svg";
const imgEllipse18 = "https://www.figma.com/api/mcp/asset/e748c8d2-2dc3-4162-a152-6e88fe937b83.svg";
const imgGroup20 = "https://www.figma.com/api/mcp/asset/993e80bd-c78f-4f6c-8136-5552605601bd.svg";
const imgGroup21 = "https://www.figma.com/api/mcp/asset/945441c9-ecdd-4ca9-8709-2bb4b254769b.svg";
const imgGroup22 = "https://www.figma.com/api/mcp/asset/74d1b6c3-4140-40d5-b786-6309100db61f.svg";
const imgGroup23 = "https://www.figma.com/api/mcp/asset/7452a27b-cdd3-424f-a786-3af2352bab28.svg";
const imgGroup24 = "https://www.figma.com/api/mcp/asset/6abc9231-ba6f-4a8f-8216-dcc0a3383aa3.svg";
const imgVector103 = "https://www.figma.com/api/mcp/asset/4609b779-0765-4e7b-8704-2af8abf81ad0.svg";
const imgVector171 = "https://www.figma.com/api/mcp/asset/0a486474-8cc9-4875-a454-86ea6d15b30b.svg";
const imgVector176 = "https://www.figma.com/api/mcp/asset/a709e418-07e2-4c36-9ef5-c3e848679915.svg";

type ContactNegativeProps = {
  className?: string;
  state?: boolean;
};

function ContactNegative({ className, state = false }: ContactNegativeProps) {
  return (
    <div className={className || "relative size-[44px]"} data-node-id="647:1856">
      <div className="absolute left-px mix-blend-difference size-[42px] top-px" data-node-id="647:1857" data-name="Negative">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative} />
      </div>
    </div>
  );
}

type WorkStripLoopProps = {
  className?: string;
  step?: "0";
};

function WorkStripLoop({ className, step = "0" }: WorkStripLoopProps) {
  return (
    <div className={className || "h-[918px] overflow-clip relative w-[306px]"} data-node-id="711:3529">
      <div className="absolute h-[3206px] left-0 top-0 w-[306px]" data-node-id="711:3530" data-name="Strip">
        <div className="absolute h-[1603px] left-0 top-0 w-[306px]" data-node-id="711:3531" data-name="Part 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPart1} />
        </div>
        <div className="absolute h-[1603px] left-0 top-[1603px] w-[306px]" data-node-id="711:3532" data-name="Part 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPart2} />
        </div>
      </div>
    </div>
  );
}

export default function WorkWithMe() {
  return (
    <div className="bg-[#f5f3f1] relative size-full" data-node-id="580:11929" data-name="Work with Me">
      <div className="absolute right-[calc(12.5%+155px)] size-[7.832px] top-[184.67px]" data-node-id="580:11930">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle38} />
      </div>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[2392px] tracking-[6.2px] w-[65.778px]" data-node-id="580:12051">
        2.3
      </p>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[3167px] tracking-[6.2px] w-[65.778px]" data-node-id="580:12052">
        2.3
      </p>
      <p className="[word-break:break-word] absolute bottom-[-3038.67px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[-116.8px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="580:12092">
        BRANDING
      </p>
      <div className="absolute bottom-[-5140px] flex h-[6201px] items-center justify-center right-[calc(87.5%+95px)] w-0" data-node-id="580:12094">
        <div className="flex-none rotate-180">
          <div className="h-[6201px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector111} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-5140px] flex h-[6201px] items-center justify-center right-[calc(87.5%+82px)] w-0" data-node-id="580:12095">
        <div className="flex-none rotate-180">
          <div className="h-[6201px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector111} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[90px] top-[180.09px] w-[1413px]" data-node-id="580:12098">
        <div className="flex-none rotate-90">
          <div className="h-[1413px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector39} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[130px] w-[1503px]" data-node-id="580:12099">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector124} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[73px] items-center justify-center left-[calc(100%-90px)] top-[58px] w-0" data-node-id="580:12100">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[73px]">
            <div className="absolute inset-[-1.2px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine3} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[73px] items-center justify-center left-[calc(37.5%+142.5px)] top-[58px] w-0" data-node-id="580:12101">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[73px]">
            <div className="absolute inset-[-1.2px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine3} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[73px] items-center justify-center left-[calc(50%+42.5px)] top-[58px] w-0" data-node-id="580:12102">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[73px]">
            <div className="absolute inset-[-1.2px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine3} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-1646px] flex h-[2670.5px] items-center justify-center right-[calc(87.5%+95px)] w-0" data-node-id="580:12103">
        <div className="flex-none rotate-180">
          <div className="h-[2670.5px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector112} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[90px] top-[193.09px] w-[1413px]" data-node-id="580:12105">
        <div className="flex-none rotate-90">
          <div className="h-[1413px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector39} />
            </div>
          </div>
        </div>
      </div>
      <a className="absolute block cursor-pointer h-[57px] left-[17px] top-[147px] w-[50px]" data-node-id="580:12141" data-name="To Main Page">
        <div className="absolute bottom-0 h-[50px] left-0 pointer-events-none top-[7px]" data-node-id="I580:12141;498:746">
          <div className="contents pointer-events-auto sticky top-0">
            <div className="absolute flex h-[50px] items-center justify-center left-0 top-[7px] w-[49.565px]" data-node-id="I580:12141;498:747">
              <div className="flex-none rotate-90">
                <div className="h-[49.565px] relative w-[50px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup34} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[50px] left-0 mix-blend-difference top-[7px] w-[49.565px]" data-node-id="I580:12141;498:753" data-name="Negative">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative1} />
        </div>
      </a>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[353.565px] leading-[30.073px] left-[186px] not-italic text-[#363636] text-[18px] top-[334px] w-[543px] whitespace-pre-wrap" data-node-id="580:12248">
        {`I see client work as a collaborative process built on dialogue, trust, and shared curiosity. This exchange allows me to understand not only practical needs, but also the character, values, and aspirations behind each project. `}
        <br aria-hidden />
        <br aria-hidden />
        My work with clients is grounded in three core values:
      </p>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+97px)] not-italic text-[#363636] text-[18px] top-[585px] w-[543px]" data-node-id="580:12273">
        <p className="leading-[30.073px] mb-0">Great collaboration grows from listening, trust, and a shared sense of direction. When that connection is strong, the work becomes more thoughtful, aligned, and richer than anything created alone.</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute h-[77px] left-[186px] top-[547px] w-[80px]" data-node-id="580:12268" data-name="Untitled-3 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitled32} />
      </div>
      <div className="absolute h-[130px] left-0 top-[58px] w-[1480px]" data-node-id="580:12258" data-name="Header Title">
        <div className="absolute h-[47px] left-[20px] opacity-25 top-[12px] w-[49px]" data-node-id="I580:12258;434:566" data-name="Untitled-3 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitled32} />
        </div>
        <div className="absolute h-[46px] left-[719.5px] opacity-25 top-[13px] w-[48px]" data-node-id="I580:12258;434:567" data-name="shape 2 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgShape22} />
        </div>
        <div className="absolute h-[49px] left-[1409px] top-[12px] w-[46px]" data-node-id="I580:12258;434:568" data-name="ChatGPT Image Sep 26, 2026, 10_06_30 PM 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[131.67%] left-[-57.3%] max-w-none top-[-14.17%] w-[215.47%]" src={imgChatGptImageSep262026100630Pm2} />
          </div>
        </div>
        <p className="[word-break:break-word] absolute bottom-[51px] font-['Gilroy:Medium'] h-[39px] leading-[42.681px] left-[calc(50%-595px)] not-italic opacity-0 text-[#363636] text-[20px] tracking-[143.8px] translate-y-full w-[1263px]" dir="auto" data-node-id="I580:12258;434:569">
          PORTFOLIO
        </p>
        <p className="[word-break:break-word] absolute bottom-[53px] font-['Gilroy:Medium'] leading-[42.681px] left-[calc(50%-595px)] not-italic opacity-0 text-[#363636] text-[20px] tracking-[165px] translate-y-full w-[1263px]" dir="auto" data-node-id="I580:12258;434:570">
          ABOUT ME
        </p>
        <p className="-translate-x-1/2 [word-break:break-word] absolute bottom-[53px] font-['Gilroy:Medium'] leading-[42.681px] left-[calc(50%+36.5px)] not-italic text-[#363636] text-[20px] text-center tracking-[101.4px] translate-y-full w-[1263px]" dir="auto" data-node-id="I580:12258;434:571">
          WORK WITH ME
        </p>
        <a className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[71px] left-0 top-[0.5px] w-[89.5px]" data-node-id="I580:12258;583:1017" data-name="Hit L" />
        <a className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[71px] left-[697.5px] top-[0.5px] w-[85px]" data-node-id="I580:12258;583:1018" data-name="Hit M" />
        <div className="absolute bg-[rgba(255,255,255,0)] h-[71px] left-[1390px] top-[0.5px] w-[90px]" data-node-id="I580:12258;583:1019" data-name="Hit R" />
      </div>
      <div className="absolute h-[71px] left-[186px] top-[889px] w-[68px]" data-node-id="580:12287" data-name="ChatGPT Image Sep 26, 2026, 10_06_30 PM 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.67%] left-[-57.3%] max-w-none top-[-14.17%] w-[215.47%]" src={imgChatGptImageSep262026100630Pm2} />
        </div>
      </div>
      <div className="absolute h-[76px] left-[186px] top-[711px] w-[78px]" data-node-id="580:12280" data-name="shape 2 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgShape22} />
      </div>
      <div className="absolute h-[47px] left-[20px] opacity-40 top-[12px] w-[49px]" data-node-id="580:12266" data-name="Untitled-3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitled32} />
      </div>
      <div className="absolute contents left-[calc(12.5%+97px)] top-[556px]" data-node-id="580:12270">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+97px)] not-italic opacity-37 text-[#363636] text-[13px] top-[556px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12271">
          COLLABORATION
        </p>
      </div>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+97px)] not-italic text-[#363636] text-[18px] top-[740px] w-[543px] whitespace-pre-wrap" data-node-id="580:12275">
        <p className="leading-[30.073px] mb-0">Originality in design is about expressing an idea in a way that feels honest, intentional, and memorable. When a design is truly original, it creates a stronger connection and helps the work stand out with meaning rather than decoration.</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute contents left-[calc(12.5%+97px)] top-[711px]" data-node-id="580:12277">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+97px)] not-italic opacity-37 text-[#363636] text-[13px] top-[711px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12278">
          ORIGINALITY
        </p>
      </div>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+97px)] not-italic text-[#363636] text-[18px] top-[918px] w-[543px] whitespace-pre-wrap" data-node-id="580:12283">
        <p className="leading-[30.073px] mb-0">Craft lives in the details and the care behind every decision. When that level of attention is present, the final work feels refined, intentional, and built to last.</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute contents left-[calc(12.5%+97px)] top-[889px]" data-node-id="580:12284">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+97px)] not-italic opacity-37 text-[#363636] text-[13px] top-[889px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12285">
          CRAFT
        </p>
      </div>
      <div className="absolute h-[918px] left-[calc(62.5%+1px)] overflow-clip top-[193px] w-[306px]" data-node-id="711:3575" data-name="Work Scroll">
        <WorkStripLoop className="absolute h-[918px] left-0 overflow-clip top-0 w-[306px]" />
      </div>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[86.082px] leading-[70.033px] left-[186px] not-italic text-[#363636] text-[65px] top-[245px] tracking-[-3.9px] w-[746px]" dir="auto" data-node-id="629:13345">
        LET’S CREATE TOGETHER
      </p>
      <div className="absolute bottom-[-5139px] flex h-[6030px] items-center justify-center right-0 w-0" data-node-id="580:12096">
        <div className="flex-none rotate-180">
          <div className="h-[6030px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector127} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-[65.37%_6.52%_32.4%_91.95%]" data-node-id="580:12149">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup16} />
      </div>
      <div className="absolute h-[14px] left-[calc(87.5%+5.88px)] top-[712px] w-[22px]" data-node-id="580:12153" data-name="Layer_1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer1} />
      </div>
      <div className="absolute contents left-[calc(100%-60.13px)] top-[708px]" data-node-id="580:12157">
        <div className="absolute left-[calc(100%-60.12px)] size-[21px] top-[708px]" data-node-id="580:12158" data-name="Layer_1">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer2} />
        </div>
      </div>
      <div className="absolute left-[calc(87.5%-46.13px)] size-[45px] top-[602px]" data-node-id="580:12160" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute bg-[rgba(217,217,217,0)] border border-[#363636] border-solid h-[37px] left-[calc(87.5%-48.13px)] opacity-[calc(var(--focus-name,44)/100)] top-[353px] w-[207.125px]" data-node-id="580:12161" />
      <div className="absolute left-[calc(100%-71.13px)] size-[44px] top-[696px]" data-node-id="580:12162">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse18} />
      </div>
      <div className="absolute left-[calc(87.5%+54.88px)] size-[44px] top-[696px]" data-node-id="580:12163">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse18} />
      </div>
      <div className="absolute left-[calc(87.5%-5.13px)] size-[44px] top-[696px]" data-node-id="580:12164">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse18} />
      </div>
      <div className="absolute bg-[rgba(217,217,217,0)] border border-[#363636] border-solid h-[37px] left-[calc(87.5%-48.13px)] opacity-[calc(var(--focus-email,44)/100)] top-[409px] w-[207.125px]" data-node-id="580:12165" />
      <div className="absolute bg-[rgba(217,217,217,0)] border border-[#363636] border-solid h-[113px] left-[calc(87.5%-48.13px)] opacity-[calc(var(--focus-message,44)/100)] top-[463px] w-[207.125px]" data-node-id="580:12166" />
      <div className="absolute contents left-[calc(87.5%-25.13px)] top-[219px]" data-node-id="580:12167">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[65.962px] leading-[normal] left-[calc(87.5%-25.13px)] not-italic text-[#363636] text-[20px] top-[219px] tracking-[6.2px] w-[190.125px]" data-node-id="580:12168">
          CONTACT ME
        </p>
        <div className="absolute flex h-[12.978px] items-center justify-center left-[calc(87.5%+93.61px)] top-[252.19px] w-[24.5px]" data-node-id="580:12169">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] relative w-[12.978px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup20} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%+12.88px)] top-[606px]" data-node-id="580:12173">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[14.857px] leading-[normal] left-[calc(87.5%+12.88px)] not-italic text-[13px] text-[rgba(54,54,54,0.64)] top-[606px] tracking-[4.03px] w-[59.429px]" data-node-id="580:12174">
          EMAIL
        </p>
        <div className="absolute flex h-[12.978px] items-center justify-center left-[calc(87.5%+86.61px)] top-[628.19px] w-[24.5px]" data-node-id="580:12175">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] relative w-[12.978px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup21} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%+12.88px)] top-[625px]" data-node-id="580:12179">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25.752px] leading-[normal] left-[calc(87.5%+12.88px)] not-italic text-[#363636] text-[13px] top-[625px] w-[150.676px]" data-node-id="580:12180">
          noajablon@gmail.com
        </p>
        <div className="absolute flex h-[12.978px] items-center justify-center left-[calc(87.5%+86.61px)] top-[657.19px] w-[24.5px]" data-node-id="580:12181">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] relative w-[12.978px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup21} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%-39.13px)] top-[364px]" data-node-id="580:12185">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[14.454px] leading-[normal] left-[calc(87.5%-39.13px)] not-italic opacity-44 text-[#363636] text-[13px] top-[364px] w-[203px]" data-node-id="580:12186">
          Name and Surname
        </p>
        <div className="absolute flex h-[9.968px] items-center justify-center left-[calc(87.5%+37.61px)] top-[391.03px] w-[24.5px]" data-node-id="580:12187">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] opacity-44 relative w-[9.968px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup22} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%-39.13px)] top-[420px]" data-node-id="580:12191">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[16.798px] leading-[normal] left-[calc(87.5%-39.13px)] not-italic opacity-44 text-[#363636] text-[13px] top-[420px] w-[203px]" data-node-id="580:12192">
          Email
        </p>
        <div className="absolute flex h-[11.585px] items-center justify-center left-[calc(87.5%+37.61px)] top-[451.42px] w-[24.5px]" data-node-id="580:12193">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] opacity-44 relative w-[11.585px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup23} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%-39.13px)] top-[474px]" data-node-id="580:12197">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[18.819px] leading-[normal] left-[calc(87.5%-39.13px)] not-italic opacity-44 text-[#363636] text-[13px] top-[474px] w-[203px]" data-node-id="580:12198">
          Message
        </p>
        <div className="absolute flex h-[12.978px] items-center justify-center left-[calc(87.5%+37.61px)] top-[509.19px] w-[24.5px]" data-node-id="580:12199">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.5px] opacity-44 relative w-[12.978px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup21} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[calc(87.5%-48.13px)] top-[282px]" data-node-id="580:12203">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[100.038px] leading-[1.19] left-[calc(87.5%-48.13px)] not-italic text-[#363636] text-[13px] top-[282px] w-[206px]" data-node-id="580:12204">{`Have a project in mind? Get in touch — I'll be happy to discuss the details of our cooperation.`}</p>
        <div className="absolute flex h-[16.183px] items-center justify-center left-[calc(87.5%+12.49px)] top-[337.11px] w-[24.862px]" data-node-id="580:12205">
          <div className="-rotate-90 flex-none">
            <div className="h-[24.862px] relative w-[16.183px]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup24} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[calc(75%+99px)] top-[766px] w-[274px]" data-node-id="580:12209">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[274px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector103} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-0 left-[calc(87.5%-68.63px)] top-[267px] w-[257.625px]" data-node-id="580:12210">
        <div className="absolute inset-[-0.6px_0]">
          <img alt="" className="block max-w-none size-full" src={imgVector171} />
        </div>
      </div>
      <div className="absolute h-0 left-[calc(87.5%-68.63px)] top-[674.56px] w-[257.625px]" data-node-id="580:12211">
        <div className="absolute inset-[-0.6px_0]">
          <img alt="" className="block max-w-none size-full" src={imgVector171} />
        </div>
      </div>
      <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[37px] left-[calc(87.5%-48.13px)] top-[353px] w-[207.125px]" data-node-id="623:885" data-name="Hit field name" />
      <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[37px] left-[calc(87.5%-48.13px)] top-[409px] w-[207.125px]" data-node-id="623:887" data-name="Hit field email" />
      <button className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[113px] left-[calc(87.5%-48.13px)] top-[463px] w-[207.125px]" data-node-id="623:889" data-name="Hit field message" />
      <ContactNegative className="absolute block cursor-pointer left-[calc(87.5%-45.63px)] size-[44px] top-[602.5px]" />
      <ContactNegative className="absolute block cursor-pointer left-[calc(87.5%-5.13px)] size-[44px] top-[696px]" />
      <ContactNegative className="absolute block cursor-pointer left-[calc(87.5%+54.88px)] size-[44px] top-[696px]" />
      <ContactNegative className="absolute block cursor-pointer left-[calc(100%-71.13px)] size-[44px] top-[696px]" />
      <div className="absolute h-[5975px] left-[calc(75%+115.88px)] top-[180px] w-[0.01px]" data-node-id="580:12097">
        <div className="absolute inset-[0_-0.59px_0_-0.6px]">
          <img alt="" className="block max-w-none size-full" src={imgVector176} />
        </div>
      </div>
      <div className="absolute h-[5975px] left-[calc(62.5%+8.13px)] top-[180px] w-[0.01px]" data-node-id="580:12289">
        <div className="absolute inset-[0_-0.59px_0_-0.6px]">
          <img alt="" className="block max-w-none size-full" src={imgVector176} />
        </div>
      </div>
      <div className="absolute contents left-[87px] top-[127px]" data-node-id="665:1436" data-name="Joints">
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="580:12113" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="580:12114" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="580:12115" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="580:12122" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="580:12123" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="580:12124" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="580:12136" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="580:12137" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="580:12138" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(37.5%+139.5px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="580:12139" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(50%+39.5px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="580:12140" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[763px]" data-node-id="665:1427" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[264px]" data-node-id="665:1428" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[671.56px]" data-node-id="665:1429" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(62.5%+5.13px)] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="665:1430" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(62.5%+5.13px)] rounded-[1.6px] size-[6px] top-[190.09px]" data-node-id="665:1431" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-3px)] rounded-[1.6px] size-[6px] top-[190.09px]" data-node-id="665:1432" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-3px)] rounded-[1.6px] size-[6px] top-[763px]" data-node-id="665:1433" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-3px)] rounded-[1.6px] size-[6px] top-[264px]" data-node-id="665:1434" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-3px)] rounded-[1.6px] size-[6px] top-[671.56px]" data-node-id="665:1435" data-name="Joint" />
      </div>
      <div className="absolute bg-[#363636] h-[58px] left-0 overflow-clip top-0 w-[1480px]" data-node-id="629:13493" data-name="Marquee">
        <motion.div className="absolute content-stretch flex items-start left-[16px] overflow-clip top-0" data-node-id="629:13494" data-name="Track">
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13495" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13496">
              MULTIDISCIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13497" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13498">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13499" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13500">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13501" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13502">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13503" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13504">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13505" />
          </div>
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13506" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13507">
              MULTIDISCIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13508" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13509">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13510" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13511">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13512" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13513">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13514" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13515">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13516" />
          </div>
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13517" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13518">
              MULTIDICIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13519" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13520">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13521" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13522">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13523" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13524">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13525" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13526">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13527" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}