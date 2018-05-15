<?php

use Illuminate\Support\Facades\Mail;

namespace App\Services;

class ContactService {

    public function sendEmail($data) {
        Mail::send(array(), array(), function($message) use ($data) {
            $message->from($data['email']);
            $message->to('randomplayer1313@abv.bg');
            $message->subject($data['subject']);
            $message->setBody($data['bodyMessage']);
        });
        
        $success = "Success!";
        
        return response()->json(array('success' => $success));
    }

}
