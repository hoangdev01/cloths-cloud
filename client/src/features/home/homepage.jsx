import { Box, Container, Image, List, ListIcon, ListItem, Text, Button, Link } from '@chakra-ui/react';
import React from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";

import img1 from "../../assets/tour-img/tour-1.jpg";
import img2 from "../../assets/tour-img/tour-2.jpg";
import img3 from "../../assets/tour-img/tour-3.jpg";
import img4 from "../../assets/tour-img/tour-4.jpg";

import base from  '../../assets/base.css'




function HomePage(props) {
  return (
    <Container maxW={'1200px'} px={'15px'} pt="100px">
      <Box display="flex" flexDir={"column"} textAlign={"center"} w="full" mb="20px">
        {/* <Box >
          <Text fontSize={"28px"} className='fontReey' color={"var(--highlight-color)"}>Danh sách địa điểm</Text>
        </Box> */}
        <Box >
          <Text fontSize={"28px"} className='fontReey' color={"var(--highlight-color)"}>
          果てしない平原へようこそ！
          </Text>
        </Box>
        <Box>
          <Text fontSize={"38px"} fontWeight={"700"} color={"var(--highlight-color)"} >Khám phá những địa điểm mới lạ !</Text>
        </Box>
        {/* <Box>
          <Text fontSize={"38px"} fontWeight={"700"} color={"var(--highlight-color)"} >Chào mừng đến với bình nguyên vô tận !</Text>
        </Box> */}
      </Box>
      <Box display="flex" alignItems="center" w="full" mb="10px">
        {/* <Box maxW={'25%'} px="5px" role="group"> */}
        <Box maxW={'50%'} px="5px" role="group"> 
          <Box overflow={"hidden"} rounded={'10px'}>
            <Image
              w={'full'}
              transition={"all 0.5s ease"}
              cursor="pointer"
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              // src={
              //   'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-1.f32b89c3.png'
              // }
              src={
                'https://telehub.vn/wp-content/uploads/2021/09/99-thuyen_hoa.jpeg'
              }
            />
          </Box>
        </Box>
        <Box maxW={'50%'} px="5px" role="group">
            <Box overflow={"hidden"} rounded={'10px'}>
                <Image
                    w={'full'}
                    transition={"all 0.5s ease"}
                    cursor={"pointer"}
                    _groupHover={{
                        transform: 'scale(1.1)'
                    }}
                    rounded={'10px'}
                    // src={
                    // 'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-2.6b007ca8.png'
                    // }
                    src={
                      'https://www.anhdulich.vn/storage/sliders/slide4.jpg'
                    }
                />
            </Box>          
        </Box>
        <Box maxW={'28%'} px="5px" role="group">
          <Box overflow={"hidden"} rounded={'10px'}>
            <Image
              w={'full'}
              transition={"all 0.5s ease"}
              cursor="pointer"
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              // src={
              //   'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-3.d37d50e6.png'
              // }
              src={
                'https://savingbooking.com/wp-content/uploads/2020/05/chia-se-4-meo-nho-chup-anh-du-lich-sieu-sieu-dep-savingbooking-6.jpg'
              }
            />
          </Box>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" w="full" mb="10px">
        <Box maxW={'50%'} px="5px" role="group">
          <Box overflow={"hidden"} rounded={'10px'}>
            <Image
              w={'full'}
              transition={"all 0.5s ease"}
              cursor="pointer"
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              src={
                'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-4.0ba8a85a.png'
              }
              // src={
              //   'https://i2-prod.manchestereveningnews.co.uk/incoming/article23387908.ece/ALTERNATES/s1200b/0_GettyImages-1384570282.jpg'
              // }
            />
          </Box>
        </Box>  
        <Box maxW={'50%'} px="5px" role="group">
          <Box overflow={"hidden"} rounded={'10px'}>
            <Image
              w={'full'}
              transition={"all 0.5s ease"}
              cursor="pointer"
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              src={
                'https://tevily-nextjs.vercel.app/_next/static/media/destination-1-5.a1a8d71b.png'
              }
              // src={
              //   'https://scontent.fdad8-1.fna.fbcdn.net/v/t39.30808-6/305470577_2133440270160721_6526450887703845510_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CiIHT9LxpKMAX-Qrjii&_nc_ht=scontent.fdad8-1.fna&oh=00_AfByOZEtQnmwJBS0jIuHGpfJ3Xfu7gfXwGgCS5m1BYwZDg&oe=6372BFA6'
              // }
              
            />
          </Box>
        </Box>      
      </Box> 

      <Box display="flex" alignItems="center" w="full" pt="105px" pb="111px">
          {/* left */}
          <Box w={"50%"} ml={"-45px"} mr={"-10px"} position={"relative"}>
              <Box>
                  <Image src="https://tevily-nextjs.vercel.app/_next/static/media/about-one-img-1.e526a0a5.png" bs={"border-box"}></Image>
              </Box>
              <Box position={"absolute"} top={"120px"} right={"0px"}>
                  <Text className="fontReey" fontSize={"60px"} fontWeight={"600"} color={"var(--highlight-color)"}>30%</Text>
                  <Text fontSize={"30px"} fontWeight={"700"} color={"var(--text-color)"}>Discount</Text>
              </Box>
              <Box bgColor={"#ffffff"} position={"absolute"} top={"250px"} left={"-90px"} display={"flex"} justifyContent={"center"} px={"40px"} py={"25px"} boxShadow={"0 10px 60px 0 rgb(0 0 0 / 10%)"} w={"264px"} h={"82px"} br={"10px"} rounded={"10px"}>
                <Box m={"auto"} color={"var(--highlight-color)"} >
                  <FiPhoneCall fontSize={"30px"}/>
                </Box>
                <Box>
                  <Text fontSize={"10px"} color={"#777"}>Đặt tour ngay bây giờ</Text>
                  <Text color={"var(--highlight-color)"} fontSize={"20px"} fontWeight={"700"}>666-345-002</Text>
                </Box>
              </Box>
          </Box>
          {/* right */}
          <Box w={"50%"} px={"50px"}>
              <Box>
                <Text fontSize={"50px"} fontWeight={"700"} color={"var(--text-color)"}>Du Lịch Paris</Text>
              </Box>
              <Box>
                <Text color={"var(--lightText-color)"} lineHeight={"8"} fontSize={"16px"}>Paris lãng mạng, Thành phố Ánh sáng nơi có Arc de Triomphe và Tháp Eiffel, bánh mì baguette và thời trang cao cấp. Hãy đội mũ nồi, buộc khăn và đắm mình thưởng thức ẩm thực, thỏa sức mua sắm và ghé thăm các bảo tàng nơi đây. Bon voyage! Chúc bạn một chuyến đi vui vẻ!</Text>
              </Box>
              <Box>
                <Text></Text>
              </Box>
              <Box>
                <List spacing={4} mt={"20px"}>
                  <ListItem >
                    <ListIcon as={AiOutlineCheckCircle} color='var(--highlight-color)' />
                    Một trong những thành phố lãng mạn nhất thế giới.
                  </ListItem>
                  <ListItem >
                    <ListIcon as={AiOutlineCheckCircle} color='var(--highlight-color)' />
                    Paris là một vùng đất của nghệ thuật và nghệ sĩ. 
                  </ListItem>
                  <ListItem >
                    <ListIcon as={AiOutlineCheckCircle} color='var(--highlight-color)' />
                    Paris cũng là một thành phố thủ đô nổi tiếng với viện bảo tàng.
                  </ListItem>                                
                </List>
              </Box>
              <Box mt={"50px"}>              
                <Box  maxWidth={"150px"} 
                      px={"30px"} 
                      py={"8px"} 
                      bgColor='var(--button-color)'
                      color={"blackAlpha.900"} 
                      cursor={"pointer"}        
                      _hover={
                        {
                          backgroundColor: "var(--hover-color)",

                        }
                      }
                      >Xem chi tiết</Box>
              </Box>
          </Box>
      </Box>
      
      <Box display="flex" flexDir={"column"} textAlign={"center"} w="full" mb="20px">
        <Box >
          <Text fontSize={"28px"} color={"var(--highlight-color)"} className="fontReey">Tour nổi bật</Text>
        </Box>
        <Box>
          <Text fontSize={"38px"} fontWeight={"700"} color={"var(--highlight-color)"}>Tour Du Lịch Phổ Biến Nhất</Text>
        </Box>
      </Box>
      
      <Box display="flex" textAlign={"center"} w="full" mb="20px" justifyContent={"space-between"}>
        <Box w={"275px"} overflow={"hidden"} rounded={"5px"} display={"flex"} 
             flexDir={"column"} textAlign={"start"} border={"1px solid #888780"} 
             cursor={"pointer"} 
             _hover={{                
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",            
              transform: "translateY(-1%)",
              transition: 'all 0.1s linear'
             }}>
            <Box>
              <Image src={img1}></Image>
            </Box>
            <Box py={"10px"} px={"16px"}>
              <Text color={"var(--text-color)"} fontWeight={"500"} fontSize={"18px"} minHeight={"54px"}>Vé Cáp Treo Sun World Bà Nà Hills Đà Nẵng</Text>
              <Text color={"var(--highlight-color)"} fontSize={"16px"}>700,000 VND</Text>
            </Box>          
            <Box pt={'10px'} px={'16px'}  >
                <Box  maxWidth={"150px"} 
                        px={"30px"} 
                        py={"8px"} 
                        bgColor='var(--button-color)'
                        color={"blackAlpha.900"} 
                        cursor={"pointer"}        
                        _hover={
                          {
                            backgroundColor: "var(--hover-color)",

                          }
                        }
                        >Xem chi tiết</Box>
                </Box>        
          </Box>

        <Box w={"275px"} overflow={"hidden"} rounded={"5px"} display={"flex"} 
             flexDir={"column"} textAlign={"start"} border={"1px solid #888780"} 
             cursor={"pointer"} 
             _hover={{                
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",            
              transform: "translateY(-1%)",
              transition: 'all 0.1s linear'
             }}>
          <Box>
            <Image src={img2}></Image>
          </Box>
          <Box py={"10px"} px={"16px"}>
            <Text color={"var(--text-color)"} fontWeight={"500"} fontSize={"18px"} minHeight={"54px"}>Vé Vinpearl Safari Phú Quốc</Text>
            <Text color={"var(--highlight-color)"} fontSize={"16px"}>650,000 VND</Text>
          </Box>
          <Box py={'10px'} px={'16px'}  mb={'8px'}>
              <Box maxWidth={"150px"} 
                        px={"30px"} 
                        py={"8px"} 
                        bgColor='var(--button-color)'
                        color={"blackAlpha.900"} 
                        cursor={"pointer"}        
                        _hover={
                          {
                            backgroundColor: "var(--hover-color)",

                          }
                        } >Xem chi tiết</Box>
          </Box> 
        </Box>
        <Box w={"275px"} overflow={"hidden"} rounded={"5px"} display={"flex"} 
             flexDir={"column"} textAlign={"start"} border={"1px solid #888780"} 
             cursor={"pointer"} 
             _hover={{                
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",            
              transform: "translateY(-1%)",
              transition: 'all 0.1s linear'
             }}>
          <Box>
            <Image src={img3}></Image>
          </Box>
          <Box py={"10px"} px={"16px"}>
            <Text color={"var(--text-color)"} fontWeight={"500"} fontSize={"18px"} minHeight={"54px"}>Vé Cáp Treo Sun World Fansipan Legend</Text>
            <Text color={"var(--highlight-color)"} fontSize={"16px"}>715,000 VND</Text>
          </Box>
          <Box py={'10px'} px={'16px'}  mb={'8px'}>
              <Box maxWidth={"150px"} 
                        px={"30px"} 
                        py={"8px"} 
                        bgColor='var(--button-color)'
                        color={"blackAlpha.900"} 
                        cursor={"pointer"}        
                        _hover={
                          {
                            backgroundColor: "var(--hover-color)",

                          }
                        } >Xem chi tiết</Box>
          </Box> 
        </Box>
        <Box w={"275px"} overflow={"hidden"} rounded={"5px"} display={"flex"} 
             flexDir={"column"} textAlign={"start"} border={"1px solid #888780"} 
             cursor={"pointer"} 
             _hover={{                
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",            
              transform: "translateY(-1%)",
              transition: 'all 0.1s linear'
             }}>
          <Box>
            <Image src={img4}></Image>
          </Box>
          <Box py={"10px"} px={"16px"}>
            <Text color={"var(--text-color)"} fontWeight={"500"} fontSize={"18px"} minHeight={"54px"}>Vé Công Viên Suối Khoáng Nóng Núi Thần Tài Đà Nẵng</Text>
            <Text color={"var(--highlight-color)"} fontSize={"16px"}>260,000 VND</Text>
          </Box>
          <Box py={'10px'} px={'16px'}  mb={'8px'}>
              <Box maxWidth={"150px"} 
                        px={"30px"} 
                        py={"8px"} 
                        bgColor='var(--button-color)'
                        color={"blackAlpha.900"} 
                        cursor={"pointer"}        
                        _hover={
                          {
                            backgroundColor: "var(--hover-color)",

                          }
                        } >Xem chi tiết</Box>
          </Box> 
        </Box>
        
      </Box>
             
    </Container>
    
  );
}

export default HomePage;
