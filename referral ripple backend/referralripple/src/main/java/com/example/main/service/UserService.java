package com.example.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.main.entity.User;
import com.example.main.repository.UserRepository;

@Service
public class UserService {
	
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder; // Assuming you have configured a password encoder bean

    public User registerUser(User user) {
        // Encode the password before saving
       // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}

