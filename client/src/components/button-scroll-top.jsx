import { Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaAngleRight } from "react-icons/fa"

const ButtonSrollTop = () => {
  const [buttonScroll, setButtonScroll] = useState(false)


  const ScrollShowMenu = () => {
    window.scrollY > 200 ? setButtonScroll(true) : setButtonScroll(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", ScrollShowMenu)
  })
  return (
    <Box
      position={"fixed"}
      zIndex={100}
      bgColor={"#F2F6F7"}
      color={"#071c1f"}
      fontSize={"20px"}
      fontWeight={"bold"}
      textAlign={"center"}
      right={"3%"}
      transition={"all 0.2s ease"}
      bottom={buttonScroll ? "70px" : "-50px"}
      w={"40px"}
      h={"40px"}
      cursor={"pointer"}
      lineHeight={"40px"}
      style={{
        boxShadow: "0 1px 6px 0 rgba(32, 33, 36, .28)",
        transform: "rotate(45deg)",
      }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      _hover={{
        bgColor: "var(--primary-color)",
        color: "#fff;",
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaAngleRight
        style={{
          transform: "rotate(-135deg)",
        }}
      />
    </Box>
  )
}

export default ButtonSrollTop
