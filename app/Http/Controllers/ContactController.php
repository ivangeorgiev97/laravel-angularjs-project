<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\SendEmailRequest;
use App\Services\ContactService;

class ContactController extends Controller {
    
    private $contactService;
    
    public function __construct(ContactService $contactService) {
        $this->contactService = $contactService;
    }

    public function sendEmail(SendEmailRequest $request) {
        $validated = $request->validated();
        
        $data = array(
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'bodyMessage' => $validated['message']
        );

        Mail::send(array(), array(), function($message) use ($data) {
            $message->from($data['email']);
            $message->to('randomplayer1313@abv.bg');
            $message->subject($data['subject']);
            $message->setBody($data['bodyMessage']);
        });

        return response()->json($this->contactService->sendEmail($data));
    }

}
