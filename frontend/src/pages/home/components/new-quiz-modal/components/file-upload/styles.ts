/* eslint-disable @typescript-eslint/no-unused-vars */
import { Program } from "../../../../../../models/ProgramFile";
import { Colour } from "../../../../../../utils/colour/Colour";

export const sx = {
    container: {
        getStyle: () => {
            return {
                borderRadius: '.5rem',
                position: 'relative',
                width: 'calc(100% - 2.5rem)',
                height: '6rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: '.2s ease',
                outline: `2px solid ${Colour.Secondary.L0}`,
            }
        },
    },
    uploadFileBg: { 
        getStyle: () => {
            return {
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                color: Colour.Secondary.L1,
                // outline: '1px solid red'
            }
        }
    },
    uploadFileContent: {
        getStyle: () => {
            return {
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                borderRadius: '.5rem',
                outline: '1px solid #D3D3D3',
                bgcolor: 'white',
            }
        }
    },
    fileTypeLogoContainer: { 
        getStyle: () => {
            return {
                height: '100%',
                width: '8rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    },
    fileInfoContainer: {
        getStyle: () => {
            return {
                width: 'calc(100% - 1rem)',
                height: '4rem',
                pr: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '.6rem'
            }
        }
    },
    fileButton: {
        getStyle: (programFile: Program | undefined) => {
            return {
                bgcolor: programFile ? '' : Colour.Primary.L3,
                color: programFile ? Colour.Secondary.L1 : 'white',
                position: 'absolute',
                top: `calc(2.5rem / ${programFile ? 4 : -2})`,
                right: `calc(2.5rem / ${programFile ? 4 : -2})`,
                transition: '.4s ease',
                transform: programFile ? 'rotate(-45deg)' : '',
                width: '2.5rem',
                ':hover': {
                    bgcolor: programFile ? '' : Colour.Primary.L4,
                }
            };
        }
    }
}