const imgNegative = "https://www.figma.com/api/mcp/asset/02ae1f30-9d14-4b0f-8f56-5abcc7a1bb90.svg";
const imgCoffeeCupMockup1 = "https://www.figma.com/api/mcp/asset/0c02c30a-e97f-41f4-8101-88bfeeffe3b4.png";
const imgFreeVinylMockup11 = "https://www.figma.com/api/mcp/asset/765a42c1-a01c-4620-9cda-bf965c7cddbf.png";
const imgPosterWallMockup1 = "https://www.figma.com/api/mcp/asset/c040d292-c733-461b-a4cd-dedeb020dd3a.png";
const imgChatGptImageJul122026062343Pm1 = "https://www.figma.com/api/mcp/asset/6b261680-25e2-4133-ae1e-2895d47216b3.png";
const imgCenteredBlueAlbumWithVinyl1 = "https://www.figma.com/api/mcp/asset/4c8fcedb-70be-4931-b87c-2a69f2ecc8ac.png";
const imgScreenshot20261006At1654471 = "https://www.figma.com/api/mcp/asset/1e16bbfa-306e-47dd-a6d1-c6270986e281.png";
const imgWhatsAppImage20260911At1225351 = "https://www.figma.com/api/mcp/asset/00453416-7f4b-4524-84db-85da90d54d8c.png";
const imgCenteredSmartphoneWithColorfulInstagramPoster1 = "https://www.figma.com/api/mcp/asset/7192a099-df85-45e5-84bb-8faa6b167df9.png";
import { motion } from "motion/react";
const imgUntitled32 = "https://www.figma.com/api/mcp/asset/b0e9f6ba-d723-47b0-b0e6-41743beec013.png";
const imgShape22 = "https://www.figma.com/api/mcp/asset/36ab0800-4cf3-4a1c-a8d5-d22c6d76bd9d.png";
const imgChatGptImageSep262026100630Pm2 = "https://www.figma.com/api/mcp/asset/becaf1a3-bf92-4441-b605-6f10649603ed.png";
const imgImage1 = "https://www.figma.com/api/mcp/asset/eea0cf52-ace5-4eef-8193-1f738f469bc0.png";
const imgRectangle38 = "https://www.figma.com/api/mcp/asset/3bf2a1a2-4438-43bc-94e1-c08777ea0411.svg";
const imgVector111 = "https://www.figma.com/api/mcp/asset/a22bf216-6023-47aa-b5ed-e58fbcd0b392.svg";
const imgVector39 = "https://www.figma.com/api/mcp/asset/68988274-221b-462a-a567-ab894576f862.svg";
const imgVector124 = "https://www.figma.com/api/mcp/asset/27b5efbd-5b7f-464b-a777-d759813f47bf.svg";
const imgLine3 = "https://www.figma.com/api/mcp/asset/26801aff-e53d-42aa-81e8-b6fa769ca68a.svg";
const imgVector112 = "https://www.figma.com/api/mcp/asset/e95e7ca1-d0a8-4b3e-825a-a685c394762a.svg";
const imgGroup34 = "https://www.figma.com/api/mcp/asset/4c2870ce-20a1-4da7-963d-1245f1554634.svg";
const imgNegative1 = "https://www.figma.com/api/mcp/asset/840ad67e-68a0-466e-bf61-a8534378417f.svg";
const imgVector127 = "https://www.figma.com/api/mcp/asset/793eeacb-8cc4-47e0-9354-63f4fd32a2d7.svg";
const imgGroup16 = "https://www.figma.com/api/mcp/asset/63bef9e3-22c1-4b31-a016-ef9ea2fd0630.svg";
const imgLayer1 = "https://www.figma.com/api/mcp/asset/f44d745a-3e61-452d-9167-b6a04d8d1479.svg";
const imgLayer2 = "https://www.figma.com/api/mcp/asset/5e0c5546-f181-4647-8bc0-a789716173d2.svg";
const imgEllipse18 = "https://www.figma.com/api/mcp/asset/1d0f35c1-cfd2-4d83-b9fe-3dff1a52a368.svg";
const imgGroup20 = "https://www.figma.com/api/mcp/asset/6554ea47-a2bc-4985-8916-775fe3d351c5.svg";
const imgGroup21 = "https://www.figma.com/api/mcp/asset/d9929bdc-2e30-4f52-82b6-6528fd175a89.svg";
const imgGroup22 = "https://www.figma.com/api/mcp/asset/6d4d15ee-61b9-43e0-8bed-744ef9add362.svg";
const imgGroup23 = "https://www.figma.com/api/mcp/asset/203fdc00-e9d0-4a11-a33b-53ca1770fcdd.svg";
const imgGroup24 = "https://www.figma.com/api/mcp/asset/774f6640-6f8a-40e5-9e9d-5fd8db0a542a.svg";
const imgVector103 = "https://www.figma.com/api/mcp/asset/b3f21816-453f-4ae5-b21e-d379ced44fc3.svg";
const imgVector171 = "https://www.figma.com/api/mcp/asset/643ceffc-2c92-4422-93ca-e575df89232b.svg";
const imgVector176 = "https://www.figma.com/api/mcp/asset/c15d51d6-c072-4bcf-898b-59130eedaea8.svg";

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

type WorkStripAutoscrollProps = {
  className?: string;
  step?: "0";
};

function WorkStripAutoscroll({ className, step = "0" }: WorkStripAutoscrollProps) {
  return (
    <div className={className || "h-[918px] overflow-clip relative w-[306px]"} data-node-id="585:790">
      <div className="absolute h-[6861.9px] left-0 top-0 w-[306px]" data-node-id="696:2629" data-name="Strip">
        <div className="absolute h-[219.5px] left-[7px] top-0 w-[293px]" data-node-id="696:2630" data-name="Coffee Cup Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-[-1.15%] max-w-none size-[101.95%] top-0" src={imgCoffeeCupMockup1} />
          </div>
        </div>
        <div className="absolute h-[198.2px] left-[7px] top-[232.5px] w-[293px]" data-node-id="696:2637" data-name="Free_Vinyl_Mockup_1 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130%] left-[-13.93%] max-w-none top-[-15%] w-[117.51%]" src={imgFreeVinylMockup11} />
          </div>
        </div>
        <div className="absolute h-[314.5px] left-[7px] top-[443.7px] w-[293px]" data-node-id="696:2644" data-name="Poster_Wall_Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130.99%] left-[-83.27%] max-w-none top-[-7.84%] w-[209.86%]" src={imgPosterWallMockup1} />
          </div>
        </div>
        <div className="absolute h-[376.4px] left-[7px] top-[771.2px] w-[293px]" data-node-id="696:2651" data-name="ChatGPT Image Jul 12, 2026, 06_23_43 PM 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGptImageJul122026062343Pm1} />
        </div>
        <div className="absolute h-[194.6px] left-[7px] top-[1160.6px] w-[293px]" data-node-id="696:2658" data-name="Centered blue album with vinyl 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCenteredBlueAlbumWithVinyl1} />
        </div>
        <div className="absolute h-[196.4px] left-[7px] top-[1368.2px] w-[293px]" data-node-id="696:2665" data-name="Screenshot 2026-10-06 at 16.54.47 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20261006At1654471} />
        </div>
        <div className="absolute h-[389.6px] left-[7px] top-[1577.6px] w-[293px]" data-node-id="696:2672" data-name="WhatsApp Image 2026-09-11 at 12.25.35 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWhatsAppImage20260911At1225351} />
        </div>
        <div className="absolute h-[294.1px] left-[7px] top-[1980.2px] w-[293px]" data-node-id="696:2679" data-name="Centered smartphone with colorful Instagram poster 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-40.38%] max-w-none top-0 w-[178.96%]" src={imgCenteredSmartphoneWithColorfulInstagramPoster1} />
          </div>
        </div>
        <div className="absolute h-[219.5px] left-[7px] top-[2287.3px] w-[293px]" data-node-id="696:2686" data-name="Coffee Cup Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-[-1.15%] max-w-none size-[101.95%] top-0" src={imgCoffeeCupMockup1} />
          </div>
        </div>
        <div className="absolute h-[198.2px] left-[7px] top-[2519.8px] w-[293px]" data-node-id="696:2693" data-name="Free_Vinyl_Mockup_1 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130%] left-[-13.93%] max-w-none top-[-15%] w-[117.51%]" src={imgFreeVinylMockup11} />
          </div>
        </div>
        <div className="absolute h-[314.5px] left-[7px] top-[2731px] w-[293px]" data-node-id="696:2700" data-name="Poster_Wall_Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130.99%] left-[-83.27%] max-w-none top-[-7.84%] w-[209.86%]" src={imgPosterWallMockup1} />
          </div>
        </div>
        <div className="absolute h-[376.4px] left-[7px] top-[3058.5px] w-[293px]" data-node-id="696:2707" data-name="ChatGPT Image Jul 12, 2026, 06_23_43 PM 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGptImageJul122026062343Pm1} />
        </div>
        <div className="absolute h-[194.6px] left-[7px] top-[3447.9px] w-[293px]" data-node-id="696:2714" data-name="Centered blue album with vinyl 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCenteredBlueAlbumWithVinyl1} />
        </div>
        <div className="absolute h-[196.4px] left-[7px] top-[3655.5px] w-[293px]" data-node-id="696:2721" data-name="Screenshot 2026-10-06 at 16.54.47 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20261006At1654471} />
        </div>
        <div className="absolute h-[389.6px] left-[7px] top-[3864.9px] w-[293px]" data-node-id="696:2728" data-name="WhatsApp Image 2026-09-11 at 12.25.35 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWhatsAppImage20260911At1225351} />
        </div>
        <div className="absolute h-[294.1px] left-[7px] top-[4267.5px] w-[293px]" data-node-id="696:2735" data-name="Centered smartphone with colorful Instagram poster 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-40.38%] max-w-none top-0 w-[178.96%]" src={imgCenteredSmartphoneWithColorfulInstagramPoster1} />
          </div>
        </div>
        <div className="absolute h-[219.5px] left-[7px] top-[4574.6px] w-[293px]" data-node-id="696:2742" data-name="Coffee Cup Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-[-1.15%] max-w-none size-[101.95%] top-0" src={imgCoffeeCupMockup1} />
          </div>
        </div>
        <div className="absolute h-[198.2px] left-[7px] top-[4807.1px] w-[293px]" data-node-id="696:2749" data-name="Free_Vinyl_Mockup_1 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130%] left-[-13.93%] max-w-none top-[-15%] w-[117.51%]" src={imgFreeVinylMockup11} />
          </div>
        </div>
        <div className="absolute h-[314.5px] left-[7px] top-[5018.3px] w-[293px]" data-node-id="696:2756" data-name="Poster_Wall_Mockup 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[130.99%] left-[-83.27%] max-w-none top-[-7.84%] w-[209.86%]" src={imgPosterWallMockup1} />
          </div>
        </div>
        <div className="absolute h-[376.4px] left-[7px] top-[5345.8px] w-[293px]" data-node-id="696:2763" data-name="ChatGPT Image Jul 12, 2026, 06_23_43 PM 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGptImageJul122026062343Pm1} />
        </div>
        <div className="absolute h-[194.6px] left-[7px] top-[5735.2px] w-[293px]" data-node-id="696:2770" data-name="Centered blue album with vinyl 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCenteredBlueAlbumWithVinyl1} />
        </div>
        <div className="absolute h-[196.4px] left-[7px] top-[5942.8px] w-[293px]" data-node-id="696:2777" data-name="Screenshot 2026-10-06 at 16.54.47 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20261006At1654471} />
        </div>
        <div className="absolute h-[389.6px] left-[7px] top-[6152.2px] w-[293px]" data-node-id="696:2784" data-name="WhatsApp Image 2026-09-11 at 12.25.35 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWhatsAppImage20260911At1225351} />
        </div>
        <div className="absolute h-[294.1px] left-[7px] top-[6554.8px] w-[293px]" data-node-id="696:2791" data-name="Centered smartphone with colorful Instagram poster 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-40.38%] max-w-none top-0 w-[178.96%]" src={imgCenteredSmartphoneWithColorfulInstagramPoster1} />
          </div>
        </div>
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[218.9px] w-[293px]" data-node-id="696:2631" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[231.9px] w-[293px]" data-node-id="696:2634" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[430.1px] w-[293px]" data-node-id="696:2638" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[443.1px] w-[293px]" data-node-id="696:2641" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[757.6px] w-[293px]" data-node-id="696:2645" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[770.6px] w-[293px]" data-node-id="696:2648" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1147px] w-[293px]" data-node-id="696:2652" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1160px] w-[293px]" data-node-id="696:2655" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1354.6px] w-[293px]" data-node-id="696:2659" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1367.6px] w-[293px]" data-node-id="696:2662" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1564px] w-[293px]" data-node-id="696:2666" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1577px] w-[293px]" data-node-id="696:2669" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1966.6px] w-[293px]" data-node-id="696:2673" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[1979.6px] w-[293px]" data-node-id="696:2676" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2273.7px] w-[293px]" data-node-id="696:2680" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2286.7px] w-[293px]" data-node-id="696:2683" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2506.2px] w-[293px]" data-node-id="696:2687" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2519.2px] w-[293px]" data-node-id="696:2690" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2717.4px] w-[293px]" data-node-id="696:2694" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[2730.4px] w-[293px]" data-node-id="696:2697" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3044.9px] w-[293px]" data-node-id="696:2701" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3057.9px] w-[293px]" data-node-id="696:2704" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3434.3px] w-[293px]" data-node-id="696:2708" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3447.3px] w-[293px]" data-node-id="696:2711" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3641.9px] w-[293px]" data-node-id="696:2715" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3654.9px] w-[293px]" data-node-id="696:2718" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3851.3px] w-[293px]" data-node-id="696:2722" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[3864.3px] w-[293px]" data-node-id="696:2725" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4253.9px] w-[293px]" data-node-id="696:2729" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4266.9px] w-[293px]" data-node-id="696:2732" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4561px] w-[293px]" data-node-id="696:2736" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4574px] w-[293px]" data-node-id="696:2739" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4793.5px] w-[293px]" data-node-id="696:2743" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[4806.5px] w-[293px]" data-node-id="696:2746" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5004.7px] w-[293px]" data-node-id="696:2750" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5017.7px] w-[293px]" data-node-id="696:2753" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5332.2px] w-[293px]" data-node-id="696:2757" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5345.2px] w-[293px]" data-node-id="696:2760" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5721.6px] w-[293px]" data-node-id="696:2764" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5734.6px] w-[293px]" data-node-id="696:2767" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5929.2px] w-[293px]" data-node-id="696:2771" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[5942.2px] w-[293px]" data-node-id="696:2774" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6138.6px] w-[293px]" data-node-id="696:2778" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6151.6px] w-[293px]" data-node-id="696:2781" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6541.2px] w-[293px]" data-node-id="696:2785" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6554.2px] w-[293px]" data-node-id="696:2788" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6848.3px] w-[293px]" data-node-id="696:2792" data-name="Line" />
        <div className="absolute bg-[#363636] h-[1.2px] left-[7px] top-[6861.3px] w-[293px]" data-node-id="696:2795" data-name="Line" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[216.5px]" data-node-id="696:2632" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[216.5px]" data-node-id="696:2633" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[229.5px]" data-node-id="696:2635" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[229.5px]" data-node-id="696:2636" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[427.7px]" data-node-id="696:2639" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[427.7px]" data-node-id="696:2640" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[440.7px]" data-node-id="696:2642" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[440.7px]" data-node-id="696:2643" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[755.2px]" data-node-id="696:2646" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[755.2px]" data-node-id="696:2647" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[768.2px]" data-node-id="696:2649" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[768.2px]" data-node-id="696:2650" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1144.6px]" data-node-id="696:2653" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1144.6px]" data-node-id="696:2654" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1157.6px]" data-node-id="696:2656" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1157.6px]" data-node-id="696:2657" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1352.2px]" data-node-id="696:2660" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1352.2px]" data-node-id="696:2661" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1365.2px]" data-node-id="696:2663" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1365.2px]" data-node-id="696:2664" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1561.6px]" data-node-id="696:2667" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1561.6px]" data-node-id="696:2668" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1574.6px]" data-node-id="696:2670" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1574.6px]" data-node-id="696:2671" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1964.2px]" data-node-id="696:2674" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1964.2px]" data-node-id="696:2675" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[1977.2px]" data-node-id="696:2677" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[1977.2px]" data-node-id="696:2678" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2271.3px]" data-node-id="696:2681" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2271.3px]" data-node-id="696:2682" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2284.3px]" data-node-id="696:2684" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2284.3px]" data-node-id="696:2685" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2503.8px]" data-node-id="696:2688" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2503.8px]" data-node-id="696:2689" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2516.8px]" data-node-id="696:2691" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2516.8px]" data-node-id="696:2692" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2715px]" data-node-id="696:2695" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2715px]" data-node-id="696:2696" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[2728px]" data-node-id="696:2698" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[2728px]" data-node-id="696:2699" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3042.5px]" data-node-id="696:2702" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3042.5px]" data-node-id="696:2703" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3055.5px]" data-node-id="696:2705" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3055.5px]" data-node-id="696:2706" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3431.9px]" data-node-id="696:2709" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3431.9px]" data-node-id="696:2710" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3444.9px]" data-node-id="696:2712" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3444.9px]" data-node-id="696:2713" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3639.5px]" data-node-id="696:2716" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3639.5px]" data-node-id="696:2717" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3652.5px]" data-node-id="696:2719" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3652.5px]" data-node-id="696:2720" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3848.9px]" data-node-id="696:2723" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3848.9px]" data-node-id="696:2724" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[3861.9px]" data-node-id="696:2726" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[3861.9px]" data-node-id="696:2727" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4251.5px]" data-node-id="696:2730" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4251.5px]" data-node-id="696:2731" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4264.5px]" data-node-id="696:2733" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4264.5px]" data-node-id="696:2734" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4558.6px]" data-node-id="696:2737" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4558.6px]" data-node-id="696:2738" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4571.6px]" data-node-id="696:2740" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4571.6px]" data-node-id="696:2741" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4791.1px]" data-node-id="696:2744" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4791.1px]" data-node-id="696:2745" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[4804.1px]" data-node-id="696:2747" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[4804.1px]" data-node-id="696:2748" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5002.3px]" data-node-id="696:2751" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5002.3px]" data-node-id="696:2752" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5015.3px]" data-node-id="696:2754" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5015.3px]" data-node-id="696:2755" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5329.8px]" data-node-id="696:2758" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5329.8px]" data-node-id="696:2759" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5342.8px]" data-node-id="696:2761" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5342.8px]" data-node-id="696:2762" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5719.2px]" data-node-id="696:2765" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5719.2px]" data-node-id="696:2766" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5732.2px]" data-node-id="696:2768" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5732.2px]" data-node-id="696:2769" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5926.8px]" data-node-id="696:2772" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5926.8px]" data-node-id="696:2773" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[5939.8px]" data-node-id="696:2775" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[5939.8px]" data-node-id="696:2776" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6136.2px]" data-node-id="696:2779" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6136.2px]" data-node-id="696:2780" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6149.2px]" data-node-id="696:2782" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6149.2px]" data-node-id="696:2783" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6538.8px]" data-node-id="696:2786" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6538.8px]" data-node-id="696:2787" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6551.8px]" data-node-id="696:2789" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6551.8px]" data-node-id="696:2790" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6845.9px]" data-node-id="696:2793" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6845.9px]" data-node-id="696:2794" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[4px] rounded-[1.6px] size-[6px] top-[6858.9px]" data-node-id="696:2796" data-name="Joint" />
        <div className="absolute bg-[#363636] left-[297px] rounded-[1.6px] size-[6px] top-[6858.9px]" data-node-id="696:2797" data-name="Joint" />
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
      <p className="[word-break:break-word] absolute bottom-[-3010.67px] font-['Gilroy:Regular'] h-[35px] leading-[38.024px] not-italic right-[-116.8px] text-[#f5f3f1] text-[20px] tracking-[-1.2px] translate-x-full translate-y-full w-[111.875px]" dir="auto" data-node-id="580:12092">
        BRANDING
      </p>
      <div className="absolute bottom-[-5112px] flex h-[6201px] items-center justify-center right-[calc(87.5%+95px)] w-0" data-node-id="580:12094">
        <div className="flex-none rotate-180">
          <div className="h-[6201px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector111} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-5112px] flex h-[6201px] items-center justify-center right-[calc(87.5%+82px)] w-0" data-node-id="580:12095">
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
      <div className="absolute bottom-[-1618px] flex h-[2670.5px] items-center justify-center right-[calc(87.5%+95px)] w-0" data-node-id="580:12103">
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
        I see client work as a collaborative process built on dialogue, trust, and shared curiosity. This exchange allows me to understand not only practical needs, but also the character, values, and aspirations behind each project. My goal is to translate these insights into projects that feel personal, distinctive, and authentic — work that reflects the individuality of the client while resonating meaningfully with
        <br aria-hidden />
        their audience.
        <br aria-hidden />
        <br aria-hidden />
        My work with clients is grounded in three core values:
      </p>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+128px)] not-italic text-[#363636] text-[18px] top-[649px] w-[543px]" data-node-id="580:12273">
        <p className="leading-[30.073px] mb-0">Great collaboration grows from listening, trust, and a shared sense of direction. When that connection is strong, the work becomes more thoughtful, aligned, and richer than anything created alone.</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute h-[93px] left-[187px] top-[605px] w-[96px]" data-node-id="580:12268" data-name="Untitled-3 2">
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
      <div className="absolute h-[83px] left-[186px] top-[953px] w-[79px]" data-node-id="580:12287" data-name="ChatGPT Image Sep 26, 2026, 10_06_30 PM 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.67%] left-[-57.3%] max-w-none top-[-14.17%] w-[215.47%]" src={imgChatGptImageSep262026100630Pm2} />
        </div>
      </div>
      <div className="absolute h-[87px] left-[186px] top-[780px] w-[91px]" data-node-id="580:12280" data-name="shape 2 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgShape22} />
      </div>
      <div className="absolute h-[47px] left-[20px] opacity-40 top-[12px] w-[49px]" data-node-id="580:12266" data-name="Untitled-3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitled32} />
      </div>
      <div className="absolute contents left-[calc(12.5%+128px)] top-[620px]" data-node-id="580:12270">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+128px)] not-italic opacity-37 text-[#363636] text-[13px] top-[620px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12271">
          COLLABORATION
        </p>
      </div>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+128px)] not-italic text-[#363636] text-[18px] top-[804px] w-[543px] whitespace-pre-wrap" data-node-id="580:12275">
        <p className="leading-[30.073px] mb-0">Originality in design is about expressing an idea in a way that feels honest, intentional, and memorable. When a design is truly original, it creates a stronger connection and helps the work stand out with meaning rather than decoration.</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute contents left-[calc(12.5%+128px)] top-[775px]" data-node-id="580:12277">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+128px)] not-italic opacity-37 text-[#363636] text-[13px] top-[775px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12278">
          ORIGINALITY
        </p>
      </div>
      <div className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[135.223px] leading-[0] left-[calc(12.5%+128px)] not-italic text-[#363636] text-[18px] top-[982px] w-[543px] whitespace-pre-wrap" data-node-id="580:12283">
        <p className="leading-[30.073px] mb-0">Craft lives in the details and the care behind every decision. When that level of attention is present, the final work feels refined, intentional, and built to last.</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px] mb-0">​</p>
        <p className="leading-[30.073px]">​</p>
      </div>
      <div className="absolute contents left-[calc(12.5%+128px)] top-[953px]" data-node-id="580:12284">
        <p className="[word-break:break-word] absolute font-['Gilroy:Medium'] h-[25px] leading-[normal] left-[calc(12.5%+128px)] not-italic opacity-37 text-[#363636] text-[13px] top-[953px] tracking-[4.03px] w-[225px]" dir="auto" data-node-id="580:12285">
          CRAFT
        </p>
      </div>
      <div className="absolute h-[918px] left-[calc(62.5%+1px)] overflow-clip top-[193px] w-[306px]" data-node-id="585:1364" data-name="Work Scroll">
        <WorkStripAutoscroll className="absolute h-[918px] left-0 overflow-clip top-0 w-[306px]" />
      </div>
      <p className="[word-break:break-word] absolute font-['Gilroy:Regular'] h-[86.082px] leading-[70.033px] left-[186px] not-italic text-[#363636] text-[65px] top-[245px] tracking-[-3.9px] w-[746px]" dir="auto" data-node-id="629:13345">
        LET’S CREATE TOGETHER
      </p>
      <div className="absolute bottom-[-5111px] flex h-[6030px] items-center justify-center right-0 w-0" data-node-id="580:12096">
        <div className="flex-none rotate-180">
          <div className="h-[6030px] relative w-0">
            <div className="absolute inset-[0_-0.6px]">
              <img alt="" className="block max-w-none size-full" src={imgVector127} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-[63.73%_6.52%_34.1%_91.95%]" data-node-id="580:12149">
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
