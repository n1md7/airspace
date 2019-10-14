<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commit extends Model
{
    private static function loadTheData($page = 2, $per_page = 2)
    {
        $URL = "https://api.github.com/repos/torvalds/linux/commits";
        $URL.= '?page='.$page;
        $URL.= '&per_page='.$per_page;
        $opts = [
            'http' => [
                'method' => 'GET',
                'header' => [
                    'User-Agent: PHP'
                ]
            ]
        ];

        $context = stream_context_create($opts);
        $content = file_get_contents($URL, false, $context);

        return json_decode($content);
    }

    public static function getCommits($page, $per_page)
    {
        return self::loadTheData($page, $per_page);
    }

}
