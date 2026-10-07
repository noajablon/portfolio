const imgRing = "https://www.figma.com/api/mcp/asset/d5aa9ac5-2dc2-4ece-b86c-bde3568c2fbc.svg";
const imgSpeaker = "https://www.figma.com/api/mcp/asset/4f8a0750-5cbc-41d0-abfc-04ac6c08a408.svg";
const imgMuteX = "https://www.figma.com/api/mcp/asset/848c9c3f-5638-4c9f-80a1-0f986d13beeb.svg";
const imgGroup34 = "https://www.figma.com/api/mcp/asset/2c4022c1-57d0-44cb-8af2-ef5a7621784e.svg";
const imgNegative = "https://www.figma.com/api/mcp/asset/cd465365-b0b5-4bb7-a842-799bdec8c0a1.svg";
import { motion } from "motion/react";
const imgBrandPosters = "https://www.figma.com/api/mcp/asset/469bf166-de68-4ceb-bb41-adffeb1587d6.png";
const imgUntitled31 = "https://www.figma.com/api/mcp/asset/c07a3b15-7735-4396-86d9-c1acee2e8a14.png";
const imgShape22 = "https://www.figma.com/api/mcp/asset/6ea71598-4df1-43fb-82ab-3d9ecce844c2.png";
const imgChatGptImageSep262026100630Pm2 = "https://www.figma.com/api/mcp/asset/3c24d950-e266-48de-9015-23b4edc967b2.png";
const imgImage2 = "https://www.figma.com/api/mcp/asset/962d0cc9-56d7-4d4f-bdca-6dc2735474b3.png";
const imgDsc010826 = "https://www.figma.com/api/mcp/asset/8f9d0b99-9bab-45a7-86f8-7a3db112ac32.png";
const imgProduct21 = "https://www.figma.com/api/mcp/asset/4a284ace-735e-4313-b7e4-21b3eed3ee1e.png";
const imgRectangle38 = "https://www.figma.com/api/mcp/asset/ac5534bc-2258-4323-ae84-e0c8d46b4352.svg";
const imgEllipse21 = "https://www.figma.com/api/mcp/asset/c114340b-5fa7-4db4-a440-18f71c7e0dcf.svg";
const imgGroup10 = "https://www.figma.com/api/mcp/asset/e7fabfa1-7144-4707-8cc9-260df1d1c617.svg";
const imgNegative1 = "https://www.figma.com/api/mcp/asset/0f48dd87-25ae-4850-8846-affa0b335637.svg";
const imgEllipse22 = "https://www.figma.com/api/mcp/asset/daa344c9-6b82-4bd2-85fb-0a8dce402b98.svg";
const imgGroup9 = "https://www.figma.com/api/mcp/asset/cf065c16-54a5-4d12-89be-7ac1c8b052ee.svg";
const imgNegative2 = "https://www.figma.com/api/mcp/asset/3f061033-8404-49fc-a39c-5b0681fd91f9.svg";
const imgVector120 = "https://www.figma.com/api/mcp/asset/bf39dd28-3e60-4f38-84a4-96d649e8a1b0.svg";
const imgVector111 = "https://www.figma.com/api/mcp/asset/45ebabbb-192e-4b41-8403-516274b4430a.svg";
const imgVector110 = "https://www.figma.com/api/mcp/asset/6e9d751a-70b4-4157-9b4f-a5cb3ca2d73c.svg";
const imgVector112 = "https://www.figma.com/api/mcp/asset/33a077e1-e6dd-4454-906f-698daf736370.svg";
const imgGoBackButton = "https://www.figma.com/api/mcp/asset/a64d4689-8be4-420c-b56f-c059bd1436a2.svg";
const imgGoBackButton1 = "https://www.figma.com/api/mcp/asset/13a6a4af-a60d-4c3b-8a52-c56bda58f612.svg";
const imgVector218 = "https://www.figma.com/api/mcp/asset/9ddf47b3-d7c0-4d5f-a854-37b75e77745f.svg";
const imgGroup11 = "https://www.figma.com/api/mcp/asset/bcf31b09-390a-4d7f-8918-302be83eb71b.svg";
const imgVector39 = "https://www.figma.com/api/mcp/asset/b73cd258-1e35-4867-b248-43fa726573e0.svg";
const imgLine2 = "https://www.figma.com/api/mcp/asset/392d068a-fcb7-45d9-a6a2-dc7804e814f8.svg";
const imgVector222 = "https://www.figma.com/api/mcp/asset/80528b6c-0a0a-45b0-ab82-e6d5e5dff1ab.svg";
const imgVector176 = "https://www.figma.com/api/mcp/asset/994cdd03-47d4-4fe3-9eaf-337c7c05a386.svg";
const imgVector127 = "https://www.figma.com/api/mcp/asset/1ccfc178-6012-4a08-8030-ee466462c961.svg";
const imgVector223 = "https://www.figma.com/api/mcp/asset/96df33c4-8adc-4419-bad8-1bdd35d98813.svg";
const imgEllipse23 = "https://www.figma.com/api/mcp/asset/58fc99bb-8e3f-4a22-86ba-0c7acbc7671f.svg";
const imgGroup12 = "https://www.figma.com/api/mcp/asset/e341c713-8dec-4af9-999c-39a71a852611.svg";
const imgNegative3 = "https://www.figma.com/api/mcp/asset/e7d51027-62b7-426c-aa06-29c59208cd1b.svg";

type SoundButtonProps = {
  className?: string;
  sound?: boolean;
};

function SoundButton({ className, sound = false }: SoundButtonProps) {
  return (
    <div className={className || "relative size-[40px]"} data-node-id="593:1148">
      <div className="absolute left-[0.5px] size-[39px] top-[0.5px]" data-node-id="593:1149" data-name="Ring">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRing} />
      </div>
      <div className="absolute h-[14px] left-[11px] top-[13px] w-[9px]" data-node-id="593:1150" data-name="Speaker">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSpeaker} />
      </div>
      <div className="absolute left-[23px] size-[7px] top-[16.5px]" data-node-id="593:1151" data-name="Mute X">
        <div className="absolute inset-[-10%]">
          <img alt="" className="block max-w-none size-full" src={imgMuteX} />
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0)] cursor-pointer left-0 size-[40px] top-0" data-node-id="593:1152" data-name="Hit" />
    </div>
  );
}

type NextArtworkButtonProps = {
  className?: string;
  state?: "Default";
};

function NextArtworkButton({ className, state = "Default" }: NextArtworkButtonProps) {
  return (
    <div className={className || "h-[57px] relative w-[50px]"} data-node-id="651:888">
      <div className="absolute bottom-0 h-[50px] left-0 pointer-events-none top-[7px]" data-node-id="651:889">
        <div className="contents pointer-events-auto sticky top-0">
          <div className="absolute flex h-[50px] items-center justify-center left-0 top-[7px] w-[49.565px]" data-node-id="651:890">
            <div className="-rotate-90 flex-none">
              <div className="h-[49.565px] relative w-[50px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup34} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[50px] left-0 mix-blend-difference top-[7px] w-[49.565px]" data-node-id="651:896" data-name="Negative">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative} />
      </div>
    </div>
  );
}

export default function Mazor() {
  return (
    <div className="bg-[#f5f3f1] relative size-full" data-node-id="441:1300" data-name="Mazor">
      <div className="absolute right-[calc(12.5%+155px)] size-[7.832px] top-[184.67px]" data-node-id="441:1301">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle38} />
      </div>
      <p className="[word-break:break-word] absolute bottom-[80.88%] font-['Gilroy:Regular'] leading-[1.4] left-[216px] not-italic text-[#363636] text-[18px] top-[10.55%] w-[504px]" data-node-id="441:1421">
        Mazor is a branding project for a luxury fungi-infused finishing salt, designed to transform an everyday ingredient into a refined culinary experience. The visual identity combines organic textures with a sophisticated graphic language, creating a premium brand that reflects the richness, craftsmanship, and ritual of elevated dining.
      </p>
      <div className="absolute h-[681px] left-[103px] top-[3138px] w-[1122.875px]" data-node-id="441:1536" data-name="Website">
        <div className="absolute inset-0 overflow-hidden" />
      </div>
      <SoundButton className="absolute block cursor-pointer left-[calc(75%+61.88px)] size-[40px] top-[3763px]" />
      <div className="-translate-x-1/2 absolute h-[762px] left-[calc(56.25%-54px)] top-[2363px] w-[1351px]" data-node-id="441:1452" data-name="Brand Posters">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[134.32%] left-0 max-w-none top-[-15.32%] w-full" src={imgBrandPosters} />
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[722px] tracking-[6.2px] w-[65.778px]" data-node-id="441:1455">
        2.1
      </p>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[1637px] tracking-[6.2px] w-[65.778px]" data-node-id="441:1456">
        2.2
      </p>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[2396px] tracking-[6.2px] w-[65.778px]" data-node-id="441:1457">
        2.3
      </p>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[74px] leading-[normal] left-[24px] not-italic text-[#363636] text-[20px] top-[3171px] tracking-[6.2px] w-[65.778px]" data-node-id="437:3130">
        2.4
      </p>
      <div className="absolute contents left-[calc(25%+76px)] top-[3892px]" data-node-id="462:962">
        <a className="absolute block cursor-pointer h-[115px] left-[calc(25%+76px)] top-[3892px] w-[146px]" data-node-id="499:749" data-name="Previous Design">
          <div className="absolute contents h-[115px] left-0 top-0 w-[146px]" data-node-id="I499:749;498:726">
            <div className="absolute flex h-[115px] items-center justify-center left-[32px] top-0 w-[114px]" data-node-id="I499:749;498:727">
              <div className="flex-none rotate-90">
                <div className="h-[114px] relative w-[115px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse21} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[20px] items-center justify-center left-0 top-[59px] w-[136px]" data-node-id="I499:749;498:728">
              <div className="-rotate-90 flex-none">
                <div className="h-[136px] relative w-[20px]" data-name="Back to Top">
                  <div className="absolute flex inset-[30.15%_-15%_-1.47%_-75%] items-center justify-center" data-node-id="I499:749;498:729" style={{ containerType: "size" }}>
                    <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                      <p className="[word-break:break-word] font-['Gilroy:Regular'] leading-[19px] not-italic relative text-[#363636] text-[18px] text-center w-full">PREVIOUS DESIGN</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex inset-[19.13%_30.99%_58.36%_49.32%] items-center justify-center" data-node-id="I499:749;498:730" style={{ containerType: "size" }}>
              <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                <div className="relative size-full">
                  <div className="absolute inset-[-4.65%_-7.3%_0_-7.3%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[115px] left-[32px] mix-blend-difference top-0 w-[114px]" data-node-id="I499:749;498:733" data-name="Negative">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative1} />
          </div>
        </a>
      </div>
      <button className="absolute block cursor-pointer h-[115px] left-[calc(37.5%+15.07px)] top-[3893px] w-[181.86px]" data-node-id="462:970" data-name="To Top · End">
        <div className="absolute contents left-0 top-0" data-node-id="I462:970;465:672">
          <div className="absolute left-[71.53px] size-[115px] top-0" data-node-id="I462:970;465:673">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse22} />
          </div>
          <div className="absolute flex h-[26.744px] items-center justify-center left-0 top-[76.89px] w-[181.86px]" data-node-id="I462:970;465:674">
            <div className="-rotate-90 flex-none">
              <div className="h-[181.86px] relative w-[26.744px]" data-name="Back to Top">
                <div className="absolute bottom-[16.91%] flex items-center justify-center left-1/4 right-[15%] top-[41.18%]" data-node-id="I462:970;465:675" style={{ containerType: "size" }}>
                  <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                    <p className="[word-break:break-word] font-['Brandon_Grotesque:Regular'] leading-[normal] not-italic relative size-full text-[#363636] text-[21.4px] text-left">TO TOP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[20.93%_32.09%_54.07%_53.68%] items-center justify-center" data-node-id="I462:970;465:676" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-4.65%_-7.3%_0_-7.3%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup9} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[53.49px] mix-blend-difference size-[115px] top-0" data-node-id="I462:970;465:679" data-name="Negative">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative2} />
        </div>
      </button>
      <div className="absolute h-[130px] left-0 top-[58px] w-[1480px]" data-node-id="462:2075" data-name="Header Title">
        <div className="absolute h-[47px] left-[20px] top-[12px] w-[49px]" data-node-id="I462:2075;286:5230" data-name="Untitled-3 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitled31} />
        </div>
        <div className="absolute h-[46px] left-[719.5px] opacity-25 top-[13px] w-[48px]" data-node-id="I462:2075;286:5284" data-name="shape 2 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgShape22} />
        </div>
        <div className="absolute h-[49px] left-[1409px] opacity-25 top-[12px] w-[46px]" data-node-id="I462:2075;286:5285" data-name="ChatGPT Image Sep 26, 2026, 10_06_30 PM 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[131.67%] left-[-57.3%] max-w-none top-[-14.17%] w-[215.47%]" src={imgChatGptImageSep262026100630Pm2} />
          </div>
        </div>
        <p className="[word-break:break-word] absolute bottom-[51px] font-['Gilroy:Medium'] leading-[42.681px] left-[calc(50%-595px)] not-italic text-[#363636] text-[20px] tracking-[137.6px] translate-y-full w-[1215px]" dir="auto" data-node-id="I462:2075;307:442">
          PORTFOLIO
        </p>
        <p className="[word-break:break-word] absolute bottom-[53px] font-['Gilroy:Medium'] leading-[42.681px] left-[calc(50%-595px)] not-italic opacity-0 text-[#363636] text-[20px] tracking-[165px] translate-y-full w-[1182px]" dir="auto" data-node-id="I462:2075;433:557">
          ABOUT ME
        </p>
        <p className="[word-break:break-word] absolute bottom-[53px] font-['Gilroy:Medium'] leading-[42.681px] left-[calc(50%-595px)] not-italic opacity-0 text-[#363636] text-[20px] tracking-[70px] translate-y-full w-[1263px]" dir="auto" data-node-id="I462:2075;583:718">
          WORK WITH ME
        </p>
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[69px]" data-node-id="I462:2075;436:563" data-name="Joint Marker" />
        <a className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[71px] left-0 top-[0.5px] w-[89.5px]" data-node-id="I462:2075;583:1005" data-name="Hit L" />
        <a className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[71px] left-[697.5px] top-[0.5px] w-[85px]" data-node-id="I462:2075;583:1006" data-name="Hit M" />
        <a className="absolute bg-[rgba(255,255,255,0)] block cursor-pointer h-[71px] left-[1390px] top-[0.5px] w-[90px]" data-node-id="I462:2075;583:1007" data-name="Hit R" />
      </div>
      <p className="[word-break:break-word] absolute bottom-[-40.67px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[-116.8px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="441:1514">
        BRANDING
      </p>
      <div className="absolute flex h-0 items-center justify-center left-[2px] top-[2350px] w-[1503px]" data-node-id="441:1430">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[1604px] w-[1503px]" data-node-id="441:1432">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-2142px] flex h-[6201px] items-center justify-center right-[calc(100%-90px)] w-0" data-node-id="441:1442">
        <div className="flex-none rotate-180">
          <div className="h-[6201px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector111} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[90px] items-center justify-center left-0 top-[193.09px] w-[1413px]" data-node-id="441:1478">
        <div className="flex-none rotate-90">
          <div className="h-[1413px] relative w-[90px]">
            <div className="absolute inset-[0_99.31%_0_-0.69%]">
              <img alt="" className="block max-w-none size-full" src={imgVector110} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[1352px] flex h-[2670.5px] items-center justify-center right-[calc(100%-90px)] w-0" data-node-id="441:1475">
        <div className="flex-none rotate-180">
          <div className="h-[2670.5px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector112} />
            </div>
          </div>
        </div>
      </div>
      <a className="absolute block cursor-pointer h-[57px] left-[17px] top-[222px] w-[50px]" data-node-id="499:760" data-name="To Main Page">
        <div className="absolute bottom-0 h-[50px] left-0 pointer-events-none top-[7px]" data-node-id="I499:760;498:746">
          <div className="contents pointer-events-auto sticky top-0">
            <div className="absolute flex h-[50px] items-center justify-center left-0 top-[7px] w-[49.565px]" data-node-id="I499:760;498:747">
              <div className="flex-none rotate-90">
                <div className="h-[49.565px] relative w-[50px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup34} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[50px] left-0 mix-blend-difference top-[7px] w-[49.565px]" data-node-id="I499:760;498:753" data-name="Negative">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative} />
        </div>
      </a>
      <NextArtworkButton className="absolute block cursor-pointer h-[57px] left-[calc(100%-67px)] top-[222px] w-[50px]" />
      <div className="absolute h-[76.351px] left-[214px] top-[320px] w-[644px]" data-node-id="496:5510" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.02%] left-[-106.67%] max-w-none top-[-1.01%] w-[307.71%]" src={imgImage2} />
        </div>
      </div>
      <p className="[word-break:break-word] absolute bottom-[52.02%] font-['Gilroy:Regular'] leading-[1.54] left-[calc(87.5%-48.13px)] not-italic text-[#363636] text-[13px] top-[40.8%] w-[185px]" data-node-id="561:5695">
        Starting with a brief to create a mushroom-based brand, we chose salt as a way to ground the concept in Israel. The Dead Sea became our starting point, leading us to research salt formations, crystalline textures, and the properties associated with its minerals.
      </p>
      <div className="absolute contents left-[calc(87.5%-50.13px)] top-[1633px]" data-node-id="561:5696">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(87.5%-50.13px)] not-italic opacity-37 text-[#363636] text-[13px] top-[1633px] tracking-[4.03px] w-[167px]" dir="auto" data-node-id="561:5697">
          THE BRIEF
        </p>
      </div>
      <p className="[word-break:break-word] absolute bottom-[46.02%] font-['Gilroy:Regular'] leading-[1.54] left-[calc(87.5%-48.13px)] not-italic text-[#363636] text-[13px] top-[46.8%] w-[185px]" data-node-id="561:5699">
        We chose translucent parchment to partially reveal the product, creating a sense of anticipation as the packaging unfolds. The outer packaging was designed to remain on display—a lasting object with a place on the kitchen shelf.
      </p>
      <div className="absolute contents left-[calc(87.5%-48.13px)] top-[1879px]" data-node-id="561:5700">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(87.5%-48.13px)] not-italic opacity-37 text-[#363636] text-[13px] top-[1879px] tracking-[4.03px] w-[191.125px]" dir="auto" data-node-id="561:5701">{`THE PACKAGING `}</p>
      </div>
      <div className="absolute inset-[16.88%_1.76%_61.01%_6.96%]" data-node-id="561:5703" data-name="DSC_0108-2 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDsc010826} />
      </div>
      <div className="absolute h-[729.191px] left-[105px] rounded-[10px] top-[1605px] w-[1120.875px]" data-node-id="561:5722" data-name="DSC_0108-2 5">
        <div className="absolute h-[729.191px] left-0 top-0 w-[1094.348px]" data-node-id="I561:5722;437:2828" data-name="product 2 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[138.4%] left-0 max-w-none top-[-19.12%] w-full" src={imgProduct21} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex h-[50.56px] items-center justify-center left-[91.68%] right-[3.7%] top-1/2" data-node-id="I561:5722;437:2829" style={{ containerType: "size" }}>
          <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
            <button className="block cursor-pointer relative size-full" data-name="Go Back Button">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoBackButton} />
            </button>
          </div>
        </div>
        <button className="-translate-y-1/2 absolute block cursor-pointer h-[50.56px] left-[4.72%] right-[90.66%] top-[calc(50%+1.12px)]" data-node-id="I561:5722;437:2830" data-name="Go Back Button">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoBackButton1} />
        </button>
      </div>
      <p className="[word-break:break-word] absolute bottom-[13.18%] font-['Gilroy:Regular'] leading-[1.54] left-[calc(87.5%-50px)] not-italic text-[#363636] text-[13px] top-[79.64%] w-[180px]" data-node-id="561:5732">
        We positioned Mazor for passionate home cooks who bring the precision and care of fine dining into their own kitchens. This audience shaped our approach to the product, its visual identity, and the ritual of using it.
      </p>
      <div className="absolute contents left-[calc(87.5%-50.13px)] top-[3219px]" data-node-id="561:5733">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(87.5%-50.13px)] not-italic opacity-37 text-[#363636] text-[13px] top-[3219px] tracking-[4.03px] w-[193.125px]" dir="auto" data-node-id="561:5734">{`THE AUDIENCE `}</p>
      </div>
      <div className="absolute h-[482.908px] left-[calc(75%+39px)] top-[193.09px] w-[228px]" data-node-id="561:5736" data-name="סרטון רץ עמוד ראשון">
        <div className="absolute inset-0 overflow-hidden" />
      </div>
      <SoundButton className="absolute block cursor-pointer left-[calc(87.5%+27px)] size-[40px] top-[616px]" />
      <div className="absolute contents left-[219px] top-[273px]" data-node-id="608:12676">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[47px] leading-[normal] left-[219px] not-italic opacity-37 text-[#363636] text-[20px] top-[273px] tracking-[6.2px] w-[192.148px]" dir="auto" data-node-id="608:12677">
          02/ MAZOR
        </p>
      </div>
      <div className="[word-break:break-word] absolute grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[42px] leading-none left-[calc(50%+11.5px)] not-italic text-[#363636] top-[546.35px] w-[100px]" data-node-id="608:13307">
        <p className="font-['Gilroy:Regular'] justify-self-stretch relative self-stretch shrink-0 text-[9px] tracking-[2.79px]" dir="auto" data-node-id="608:13308">
          PLACE
        </p>
        <p className="font-['Gilroy:Medium'] justify-self-stretch relative self-stretch shrink-0 text-[15px]" dir="auto" data-node-id="608:13309">
          Bezalel
        </p>
      </div>
      <div className="[word-break:break-word] absolute grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[42px] leading-none left-[calc(50%+11.5px)] not-italic text-[#363636] top-[491.35px] w-[100px]" data-node-id="608:13310">
        <p className="font-['Gilroy:Regular'] justify-self-stretch relative self-stretch shrink-0 text-[9px] tracking-[2.79px]" dir="auto" data-node-id="608:13311">
          YEAR
        </p>
        <p className="font-['Gilroy:Medium'] justify-self-stretch relative self-stretch shrink-0 text-[15px]" dir="auto" data-node-id="608:13312">
          2024
        </p>
      </div>
      <div className="[word-break:break-word] absolute grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] leading-none left-[calc(50%+11.5px)] not-italic text-[#363636] top-[436.35px] w-[100px]" data-node-id="608:13313">
        <p className="font-['Gilroy:Regular'] h-[21px] justify-self-stretch relative shrink-0 text-[9px] tracking-[2.79px]" dir="auto" data-node-id="608:13314">
          FIELD
        </p>
        <p className="font-['Gilroy:Medium'] h-[21px] justify-self-stretch relative shrink-0 text-[15px]" dir="auto" data-node-id="608:13315">
          Branding
        </p>
      </div>
      <div className="absolute h-[153px] left-[calc(37.5%+178.5px)] top-[433.35px] w-0" data-node-id="608:13316">
        <div className="absolute inset-[0_-0.6px]">
          <img alt="" className="block max-w-none size-full" src={imgVector218} />
        </div>
      </div>
      <div className="absolute contents left-[calc(50%+2px)] top-[3893px]" data-node-id="629:13917">
        <a className="absolute block cursor-pointer h-[115px] left-[calc(50%+2px)] top-[3893px] w-[146px]" data-node-id="629:13918" data-name="Next Design">
          <div className="absolute contents h-[115px] left-0 top-0 w-[146px]" data-node-id="I629:13918;498:706">
            <div className="absolute flex h-[115px] items-center justify-center left-[32px] top-0 w-[114px]" data-node-id="I629:13918;498:707">
              <div className="flex-none rotate-90">
                <div className="h-[114px] relative w-[115px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse21} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[20px] items-center justify-center left-0 top-[58px] w-[136px]" data-node-id="I629:13918;498:708">
              <div className="-rotate-90 flex-none">
                <div className="h-[136px] relative w-[20px]" data-name="Back to Top">
                  <div className="absolute flex inset-[30.15%_-15%_-1.47%_0] items-center justify-center" data-node-id="I629:13918;498:709" style={{ containerType: "size" }}>
                    <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                      <p className="[word-break:break-word] font-['Gilroy:Regular'] leading-[19px] not-italic relative size-full text-[#363636] text-[18px] text-center">NEXT DESIGN</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex inset-[19.13%_28.94%_58.36%_51.37%] items-center justify-center" data-node-id="I629:13918;498:710" style={{ containerType: "size" }}>
              <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
                <div className="relative size-full">
                  <div className="absolute inset-[-4.65%_-7.3%_0_-7.3%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup11} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[115px] left-[32px] mix-blend-difference top-0 w-[114px]" data-node-id="I629:13918;498:713" data-name="Negative">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative1} />
          </div>
        </a>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[180.09px] w-[1503px]" data-node-id="655:986">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector39} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[130px] w-[1503px]" data-node-id="655:987">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[73px] items-center justify-center left-[calc(50%+42.5px)] top-[58px] w-0" data-node-id="655:988">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[73px]">
            <div className="absolute inset-[-1.2px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[73px] items-center justify-center left-[calc(37.5%+142.5px)] top-[58px] w-0" data-node-id="655:989">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[73px]">
            <div className="absolute inset-[-1.2px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine2} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[3392px] flex h-[667px] items-center justify-center right-[90px] w-0" data-node-id="655:991">
        <div className="flex-none rotate-180">
          <div className="h-[667px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector222} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-2142px] flex h-[6201px] items-center justify-center right-[calc(87.5%+82px)] w-0" data-node-id="441:1443">
        <div className="flex-none rotate-180">
          <div className="h-[6201px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector111} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[2px] top-[3138px] w-[1503px]" data-node-id="437:3129">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[755.5px] left-[calc(75%+115.88px)] top-[1592.5px] w-0" data-node-id="441:1450">
        <div className="absolute inset-[0_-0.6px]">
          <img alt="" className="block max-w-none size-full" src={imgVector176} />
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[2px] top-[2363px] w-[1503px]" data-node-id="441:1435">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-2142px] flex h-[5534px] items-center justify-center right-[26px] w-0" data-node-id="441:1449">
        <div className="flex-none rotate-180">
          <div className="h-[5534px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector127} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[2px] top-[3125px] w-[1503px]" data-node-id="437:3128">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[689px] w-[1503px]" data-node-id="655:983">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[1591px] w-[1503px]" data-node-id="441:1431">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[3392px] flex h-[509px] items-center justify-center right-[calc(12.5%+146px)] w-[0.01px]" data-node-id="656:2948">
        <div className="flex-none rotate-180">
          <div className="h-[509px] relative w-[0.01px]">
            <div className="absolute inset-[0_-0.59px_0_-3.38px]">
              <img alt="" className="block max-w-none size-full" src={imgVector223} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[193.09px] w-[1503px]" data-node-id="655:985">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[3392px] flex h-[667px] items-center justify-center right-[103px] w-0" data-node-id="655:990">
        <div className="flex-none rotate-180">
          <div className="h-[667px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector222} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[676px] w-[1503px]" data-node-id="655:984">
        <div className="flex-none rotate-90">
          <div className="h-[1503px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector120} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[87px] top-[127px]" data-node-id="665:1204" data-name="Joints">
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:959" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="655:961" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="655:962" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:963" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:964" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="655:966" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="655:967" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:968" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(50%+39.5px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:969" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(37.5%+139.5px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:970" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:971" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+79px)] rounded-[1.6px] size-[6px] top-[127px]" data-node-id="655:972" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="655:973" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+79px)] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="655:974" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+79px)] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="655:975" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[190.1px]" data-node-id="655:976" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+79px)] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:979" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:980" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.9px)] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:981" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="655:982" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(37.5%+175.5px)] rounded-[1.6px] size-[6px] top-[430.35px]" data-node-id="608:13317" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(37.5%+175.5px)] rounded-[1.6px] size-[6px] top-[583px]" data-node-id="695:19981" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[2347px]" data-node-id="665:1172" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[1588px]" data-node-id="665:1173" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[1601px]" data-node-id="665:1174" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[2360px]" data-node-id="665:1175" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[3122px]" data-node-id="665:1176" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+112.88px)] rounded-[1.6px] size-[6px] top-[3135px]" data-node-id="665:1177" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[2347px]" data-node-id="665:1178" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[1588px]" data-node-id="665:1179" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[1601px]" data-node-id="665:1180" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[2360px]" data-node-id="665:1181" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[3122px]" data-node-id="665:1182" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[3135px]" data-node-id="665:1183" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[87px] rounded-[1.6px] size-[6px] top-[673px]" data-node-id="665:1184" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[2347px]" data-node-id="665:1185" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[1588px]" data-node-id="665:1186" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[1601px]" data-node-id="665:1187" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[2360px]" data-node-id="665:1188" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[3122px]" data-node-id="665:1189" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[3135px]" data-node-id="665:1190" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[100px] rounded-[1.6px] size-[6px] top-[673px]" data-node-id="665:1191" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[2347px]" data-node-id="665:1192" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[1588px]" data-node-id="665:1193" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[1601px]" data-node-id="665:1194" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[2360px]" data-node-id="665:1195" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[3122px]" data-node-id="665:1196" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(100%-29px)] rounded-[1.6px] size-[6px] top-[3135px]" data-node-id="665:1197" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+79px)] rounded-[1.6px] size-[6px] top-[673px]" data-node-id="665:1198" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(87.5%+92px)] rounded-[1.6px] size-[6px] top-[673px]" data-node-id="665:1199" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+36px)] rounded-[1.6px] size-[6px] top-[686px]" data-node-id="665:1200" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+36px)] rounded-[1.6px] size-[6px] top-[673px]" data-node-id="665:1201" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+36px)] rounded-[1.6px] size-[6px] top-[190.09px]" data-node-id="665:1202" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[calc(75%+36px)] rounded-[1.6px] size-[6px] top-[177.09px]" data-node-id="665:1203" data-name="Joint" />
      </div>
      <button className="absolute block cursor-pointer h-[88px] left-[calc(87.5%-32.78px)] top-[668px] w-[139.163px]" data-node-id="462:982" data-name="To Top · Floating">
        <div className="absolute contents left-0 top-0" data-node-id="I462:982;465:672">
          <div className="absolute left-[41.88px] size-[88px] top-0" data-node-id="I462:982;465:673">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse23} />
          </div>
          <div className="absolute flex h-[20.465px] items-center justify-center left-0 top-[45.02px] w-[139.163px]" data-node-id="I462:982;465:674">
            <div className="-rotate-90 flex-none">
              <div className="h-[139.163px] relative w-[20.465px]" data-name="Back to Top">
                <div className="absolute bottom-[16.91%] flex items-center justify-center left-1/4 right-[15%] top-[41.18%]" data-node-id="I462:982;465:675" style={{ containerType: "size" }}>
                  <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
                    <p className="[word-break:break-word] font-['Brandon_Grotesque:Regular'] leading-[normal] not-italic relative size-full text-[#363636] text-[16.37px] text-left">TO TOP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex inset-[20.93%_32.09%_54.07%_53.68%] items-center justify-center" data-node-id="I462:982;465:676" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
              <div className="relative size-full">
                <div className="absolute inset-[-4.65%_-7.3%_0_-7.3%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup12} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[40.93px] mix-blend-difference size-[88px] top-0" data-node-id="I462:982;465:679" data-name="Negative">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNegative3} />
        </div>
      </button>
      <div className="absolute bg-[#363636] h-[58px] left-0 overflow-clip top-0 w-[1480px]" data-node-id="629:13401" data-name="Marquee">
        <motion.div className="absolute content-stretch flex items-start left-[16px] overflow-clip top-0" data-node-id="629:13405" data-name="Track">
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13406" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13407">
              MULTIDISCIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13408" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13409">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13410" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13411">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13412" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13413">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13414" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13415">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13416" />
          </div>
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13417" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13418">
              MULTIDISCIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13419" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13420">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13421" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13422">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13423" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13424">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13425" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13426">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13427" />
          </div>
          <div className="h-[58px] relative shrink-0 w-[883px]" data-node-id="629:13428" data-name="Sequence">
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35.344px] leading-[38.024px] not-italic right-[883px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[266.755px]" dir="auto" data-node-id="629:13429">
              MULTIDICIPLINARY DESIGNER
            </p>
            <div className="absolute bg-[#f5f3f1] right-[616.97px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13430" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[595.2px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13431">
              BRANDING
            </p>
            <div className="absolute bg-[#f5f3f1] right-[470.9px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13432" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[449.14px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="629:13433">
              UX/UI
            </p>
            <div className="absolute bg-[#f5f3f1] right-[366.92px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13434" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[345.16px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[168.125px]" dir="auto" data-node-id="629:13435">
              TYPOGRAPHY
            </p>
            <div className="absolute bg-[#f5f3f1] right-[200.44px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13436" />
            <p className="[word-break:break-word] absolute bottom-[45.33px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[178.67px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[129.375px]" dir="auto" data-node-id="629:13437">
              ILLUSTRATION
            </p>
            <div className="absolute bg-[#f5f3f1] right-[34.56px] rounded-[1.212px] size-[4.848px] top-[29.38px]" data-node-id="629:13438" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
