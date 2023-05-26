import { Box, Container, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import {ImPhone} from 'react-icons/im'
import {IoMdMail} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'

const footerAboutLinks = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/about"
    },
    {
        display: "Tuyển dụng",
        path: "/about"
    },
    {
        display: "Tin tức",
        path: "/about"
    }

]
const footerCustomerLinks = [
    {
        display: "Đăng ký nhà cung cấp",
        path: "/about"
    },
    {
        display: "Đối tác liên kết",
        path: "/about"
    },
    {
        display: "Chương trình cho người nổi tiếng",
        path: "/about"
    },
    {
        display: "Chương trình cho đại lý",
        path: "/about"
    },
    {
        display: "Hợp tác marketing & phân phối",
        path: "/about"
    }
]

const footerRuleLinks = [
    {
        display: "Điều khoản sử dụng",
        path: "/about"
    },
    {
        display: "Chính sách bảo mật",
        path: "/about"
    },
    {
        display: "Chính sách Cookie",
        path: "/about"
    },
    {
        display: "Chương trình thưởng phát hiện lỗi phần mềm",
        path: "/about"
    },
    {
        display: "Chính sách và quy định",
        path: "/about"
    }
]
const Footer = () => {
  return (
    <Container maxW={"full"} bgColor={"var(--background-color)"} mt={"110px"} pb={"100px"}>
        <Box maxW={"1200px"} px={"15px"} pt={"120px"} display="flex" flexDir={"column"} m={"auto"}>
            <Box w={"full"}>
                <Box display="flex" justifyContent={"space-around"}>
                    <Box w={"25%"}>
                        <Text fontWeight={"700"} fontSize={"20px"} color={"var(--text-color)"}>CONTACT</Text>
                    
                        <List spacing={4} mt={"20px"}>
                            <ListItem cursor={"pointer"} _hover={{
                                color: "var(--primary-color)"                                
                            }}>
                                <ListIcon as={ImPhone} color='var(--primary-color)' />
                                + 92 666 999 0000
                            </ListItem>
                            <ListItem cursor={"pointer"} _hover={{
                                color: "var(--primary-color)"
                            }} >
                                <ListIcon  as={IoMdMail} color='var(--primary-color)' />
                                Klook@gmail.com
                            </ListItem>
                            <ListItem cursor={"pointer"} _hover={{
                                color: "var(--primary-color)"
                            }} >
                                <ListIcon  as={AiFillHome} color='var(--primary-color)' />
                                63 Nguyễn Lương Bằng, Đà Nẵng.
                            </ListItem>                                
                        </List>
                    </Box>
                    <Box w={"25%"}>
                        <Text fontWeight={"700"} fontSize={"20px"} color={"var(--text-color)"}>VỀ REDBULL</Text>
                    
                        <List spacing={4} mt={"20px"}>
                            {footerAboutLinks.map((item, index) => (
                                <ListItem cursor={"pointer"}>{item.display}</ListItem>
                            ))}                               
                        </List>
                    </Box>  
                    <Box w={"25%"}>
                        <Text fontWeight={"700"} fontSize={"20px"} color={"var(--text-color)"}>ĐỐI TÁC</Text>
                    
                        <List spacing={4} mt={"20px"}>
                            {footerCustomerLinks.map((item, index) => (
                                <ListItem cursor={"pointer"}>{item.display}</ListItem>
                            ))}                               
                        </List>
                    </Box>                  
                    <Box w={"25%"}>
                        <Text fontWeight={"700"} fontSize={"20px"} color={"var(--text-color)"}>ĐIỀU KHOẢN SỬ DỤNG</Text>
                    
                        <List spacing={4} mt={"20px"}>
                            {footerRuleLinks.map((item, index) => (
                                <ListItem cursor={"pointer"}>{item.display}</ListItem>
                            ))}                               
                        </List>
                    </Box> 
                </Box>
            </Box>
        </Box>                          
    </Container>
    
  )
}

export default Footer