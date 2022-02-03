import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import Snackbar from ".";

export default {
  title: "Snackbar",
  component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

const Template: ComponentStory<typeof Snackbar> = (args) => {
  const [isShow, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!isShow)}>show snackbar</button>
      <div style={{ position: "fixed", top: "50px", right: 0 }}>
        {isShow && <Snackbar {...args} />}
      </div>
    </>
  );
};

export const Success = Template.bind({});
Success.args = {
  type: "SUCCESS",
  title: "제목을 입력해 주세요. 2줄 이내로 작성하는 것을 권장합니다.",
  message:
    "내용을 입력해 주세요. 4줄 이내로 작성하는 것을 권장합니다. width는 330px 고정이며, height은 가변입니다.",
  buttonText: "버튼",
};
export const Warning = Template.bind({});
Warning.args = {
  type: "WARN",
  title: "제목을 입력해 주세요. 2줄 이내로 작성하는 것을 권장합니다.",
  message:
    "내용을 입력해 주세요. 4줄 이내로 작성하는 것을 권장합니다. width는 330px 고정이며, height은 가변입니다.",
  buttonText: "버튼",
};

export const Error = Template.bind({});
Error.args = {
  type: "ERROR",
  title: "제목을 입력해 주세요. 2줄 이내로 작성하는 것을 권장합니다.",
  message:
    "내용을 입력해 주세요. 4줄 이내로 작성하는 것을 권장합니다. width는 330px 고정이며, height은 가변입니다.",
  buttonText: "버튼",
};

export const Info = Template.bind({});
Info.args = {
  type: "INFO",
  title: "제목을 입력해 주세요. 2줄 이내로 작성하는 것을 권장합니다.",
  message:
    "내용을 입력해 주세요. 4줄 이내로 작성하는 것을 권장합니다. width는 330px 고정이며, height은 가변입니다.",
  buttonText: "버튼",
};
