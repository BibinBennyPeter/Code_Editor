import React,{ useState } from 'react'
import {Stack, Box, Container, Input, InputGroup, InputLeftAddon, Tab, TabList, TabPanel, TabPanels, Tabs, Button,InputRightElement /*Text*/ } from '@chakra-ui/react'
import {EmailIcon,LockIcon, UnlockIcon} from '@chakra-ui/icons'
import {FaUser} from "react-icons/fa";
import {useToast } from "@chakra-ui/react";
//import {useHistory} from 'use-history'
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Login2 = () => {

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");


  const navigate =useNavigate();

  //const history = useHistory();


  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        { email, password },
        config
      );
    if(data){
        
        if(data.status!==401){
            const tk=data.token;
            const nm=data.name;
            console.log(nm);
            const em=data.email;
            navigate(`/home`,{
                state:{
                nm,em,tk
                },
            }
            )
        }}

      console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      //history.push("/chats");
    } catch (error) {

       toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);

  }
};




  const submitHandle = async () => {
    //setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/user",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      //setPicLoading(false);
      //history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //setPicLoading(false);
    };
  };



  return (
    <>
    <h1 id='logTitle'>CODE FRIENDS</h1>
    <div style={{width: '100vw',height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Container id='cont' maxW='2xl' bg="green.600" centerContent p="0" paddingBlock={'2px'} paddingInline={'2px'} borderRadius='9px'>
          {/* <Box
          p="-10px"
          w='100%'
          borderWidth="0px"
          borderRadius="md">
              <Text 
                fontsize="4xl"
                fontFamily="Roboto"
                fontWeight='bold'
                color="white"
                align='center'>Code Online</Text>
          </Box> */}
          <Box id='Box'bg='blue.800' w="100%" p={4} borderRadius="md" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList marginBlock={'5px'}>
              <Tab width="50%" bg='white'>Login</Tab>
              <Tab width="50%" bg='white'>Sign Up</Tab>
            </TabList>
            <TabPanels> 
              <TabPanel>
              <Stack spacing={'3'}>
                <InputGroup size='md'>
                  <InputLeftAddon children={<EmailIcon/>}></InputLeftAddon>          
                  <Input 
                  color={'white'}
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='md'>
                  <InputLeftAddon children={<LockIcon/>}></InputLeftAddon>
                  <Input  color={'white'} placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                 </Button>
          </InputRightElement>
                </InputGroup>
                  <Button type ='submit' align={'center'} bg={"blue.400"}
                    onClick={submitHandler}
                    isLoading={loading}
                  >Log in</Button>
                  <Button
                  variant="solid"
                  colorScheme="green"
                  width="100%"
                  onClick={() => {
                  setEmail("guest@example.com");
                  setPassword("123456");
                  }}
                >
                  Get Guest User Credentials
                </Button>
              </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={'3'}>
                <InputGroup size='md'>
                  <InputLeftAddon children={<FaUser/>}></InputLeftAddon>          
                  <Input color={'white'} placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='md' >
                  <InputLeftAddon children={<EmailIcon/>}></InputLeftAddon>          
                  <Input 
                  color={'white'}
                  type="email"
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup size='md'>
                  <InputLeftAddon children={<UnlockIcon/>}></InputLeftAddon>
                  <Input
                  color={'white'}
                  placeholder='Password'
                  type={show ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                  </Button>
                  </InputRightElement>

                  </InputGroup>
                  <InputGroup  size='md'>
                  <InputLeftAddon children={<LockIcon/>}></InputLeftAddon>
                  <Input color={'white'}
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                  </Button>
                  </InputRightElement>

                </InputGroup>
                  <Button type ='submit' align={'center'} bg={"blue.400"}
                  onClick={submitHandle}
                  isLoading={loading}
                  >Sign Up</Button>
              </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div></>
  )
};

export default Login2;