consts_ADDRESSES = {

    PRIVATE_KEY:{
        WIF:{
            VERSION_PREFIX : "80", //it is in HEX
            CHECK_SUM_LENGTH : 4, //in bytes
        },
        LENGTH : 64, //ending BASE64 HEX
    },
    PUBLIC_KEY:{
        LENGTH : 32, //ending BASE64 HEX
    },

    ADDRESS:{

        USE_BASE64 : true,

        LENGTH : 20,

        WIF:{
            LENGTH: 0,

            VERSION_PREFIX : "00", //ending BASE64 HEX
            CHECK_SUM_LENGTH : 4, //in bytes   //ending BASE64 HEX

            PREFIX_BASE64 : "584043fe", //BASE64 HEX  WEBD$
            //WEBD  584043
            //WEBD$ 584043FF

            SUFFIX_BASE64 : "FF", //ending BASE64 HEX
            //#w$ EC3F
            //%#$ 8FBF

            PREFIX_BASE58 : "00", //BASE58 HEX and it will be converted to Base64/58
            SUFFIX_BASE58 : "",
        }

    }

};
