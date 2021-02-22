import {Box, useColorMode} from '@chakra-ui/react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import React, {cloneElement, forwardRef} from 'react';

const NavLink = ({children, ...props}: any) => {
    const router = useRouter();
    let isActive = false;

    if (router.pathname === props.href) {
        isActive = true;
    }

    return (
        <NextLink passHref {...props}>
            {typeof children === 'function' ? children(isActive) : children}
        </NextLink>
    );
};

export const stringToUrl = (str:string, path:string = '/') => {
    return `${path}${str
        .toLowerCase()
        .split(' ')
        .join('-')}`;
};

export const SideNavLink = forwardRef(({children, icon, ...props}:any, ref) => {
    const {colorMode} = useColorMode();
    const color = {light: 'gray.700', dark: 'whiteAlpha.700'};
    return (
        <Box
            ref={ref}
            as="a"
            display="flex"
            cursor="pointer"
            align="center"
            px="2"
            py="1"
            transition="all 0.2s"
            fontWeight="medium"
            outline="none"
            _focus={{shadow: 'outline'}}
            color={color[colorMode]}
            _notFirst={{mt: 1}}
            {...props}
        >
            {icon && cloneElement(icon, {mr: 3})}
            <Box>{children}</Box>
        </Box>
    );
});

export const TopNavLink = forwardRef(({href, ...props}:any, ref) => {
    return (
        <NavLink href={href}>
            {(isActive:any) => (
                <SideNavLink
                    ref={ref}
                    aria-current={isActive ? 'page' : undefined}
                    _hover={{color: !isActive ? 'inherit' : null}}
                    {...(isActive && {color: 'teal.500', fontWeight: 'semibold'})}
                    {...props}
                />
            )}
        </NavLink>
    );
});

export const ComponentLink = forwardRef(({href, ...props}:any, ref) => {
    const {colorMode} = useColorMode();
    const hoverColor = {light: 'gray.900', dark: 'whiteAlpha.900'};
    const activeColor = {light: 'teal.800', dark: 'teal.200'};
    const activeBg = {light: 'gray.100', dark: 'gray.700'};

    return (
        <NavLink href={href}>
            {(isActive:any) => (
                <SideNavLink
                    ref={ref}
                    aria-current={isActive ? 'page' : undefined}
                    _hover={{
                        color: hoverColor[colorMode],
                        transform: 'translateX(2px)'
                    }}
                    {...(isActive && {
                        bg: activeBg[colorMode],
                        rounded: 'sm',
                        borderRadius: 4,
                        color: activeColor[colorMode],
                        _hover: {}
                    })}
                    {...props}
                />
            )}
        </NavLink>
    );
});