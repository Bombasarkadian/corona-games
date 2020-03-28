import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import DrawArea from "./DrawArea";

export default {
  component: DrawArea,
  title: "Kalambury/DrawArea",
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onUpdate: action("onUpdate"),
  onForfeit: action("onForfeit"),
};

const lines = [
  {
    points: [
      [0.40059790732436473, 0.23818127728018879],
      [0.39940209267563526, 0.24455899761107974],
      [0.40059790732436473, 0.2525311480246934],
      [0.40298953662182363, 0.27963645943098],
      [0.40657698056801195, 0.309930631002712],
      [0.40896860986547084, 0.35298024323622595],
      [0.40896860986547084, 0.3689245440634533],
      [0.40896860986547084, 0.3753022643943443],
      [0.40896860986547084, 0.3784911245597898],
      [0.40896860986547084, 0.3784911245597898],
    ],
    color: "#1b1c1d",
    width: 3,
  },
  {
    points: [
      [0.5261584454409567, 0.22861469678385235],
      [0.5261584454409567, 0.22861469678385235],
      [0.5249626307922272, 0.23339798703202055],
      [0.5237668161434977, 0.24455899761107974],
      [0.5213751868460389, 0.2652865886864753],
      [0.5130044843049327, 0.3338470822435531],
      [0.5106128550074739, 0.35298024323622595],
      [0.5106128550074739, 0.36254682373256236],
      [0.5106128550074739, 0.3673301139807306],
      [0.5106128550074739, 0.3673301139807306],
      [0.5106128550074739, 0.3673301139807306],
    ],
    color: "#1b1c1d",
    width: 3,
  },
  {
    points: [
      [0.33482810164424515, 0.45183490836503576],
      [0.33602391629297457, 0.45183490836503576],
      [0.33841554559043346, 0.45183490836503576],
      [0.34559043348281016, 0.45183490836503576],
      [0.37548579970104634, 0.45183490836503576],
      [0.39820627802690584, 0.44864604819959025],
      [0.4687593423019432, 0.43907946770325385],
      [0.5010463378176383, 0.4327017473723629],
      [0.5321375186846039, 0.4279184571241947],
      [0.5727952167414051, 0.4215407367933037],
      [0.6170403587443947, 0.41675744654513547],
    ],
    color: "#1b1c1d",
    width: 3,
  },
  {
    points: [
      [0.33841554559043346, 0.46140148886137217],
      [0.33961136023916294, 0.4645903490268176],
      [0.33961136023916294, 0.4789402197713223],
      [0.33961136023916294, 0.48531794010221324],
      [0.34319880418535126, 0.5028566710121634],
      [0.34678624813153963, 0.5124232515084998],
      [0.35874439461883406, 0.5379341328320636],
      [0.36472346786248133, 0.5475007133284],
      [0.37428998505231686, 0.5554728637420138],
      [0.39820627802690584, 0.5714171645692411],
      [0.43766816143497755, 0.5889558954791912],
      [0.49865470852017935, 0.5889558954791912],
      [0.5907324364723467, 0.486912370184936],
      [0.6002989536621823, 0.44386275795142205],
      [0.5955156950672645, 0.4295128872069174],
    ],
    color: "#1b1c1d",
    width: 3,
  },
];

export const Default = () => (
  <DrawArea
    initialLines={lines}
    remainingSeconds={number("Remaining seconds", 100, {
      range: true,
      min: 0,
      max: 120,
      step: 1,
    })}
    {...actionsData}
  />
);