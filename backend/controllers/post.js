const connection = require("../db");

exports.getPosts = async (req, res, next) => {
  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
    ORDER BY posts.createDate DESC
  `;

  connection.query(query, (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.getPostById = async (req, res, next) => {
  const { post_id } = req.params;
  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
    WHERE posts.post_id = ?
  `;

  connection.query(query, [post_id], (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.uploadPost = async (req, res, next) => {
  const { title, thumbnail, content, user_id, category_id } = req.body;

  const query =
    "INSERT INTO `posts` (`post_id`,`title`, `thumbnail`, `content`, `user_id`, `category_id`) VALUES (SUBSTRING(UUID(), 1, 12),?, ?, ?, ?, ?)";
  const values = [title, thumbnail, content, user_id, category_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    const categoryName = "SELECT category_name FROM categories";
    // Send success response
    return res.status(201).json({
      success: true,
      message: "Post uploaded successfully",
      data: {
        title,
        thumbnail,
        content,
        user_id,
        category_id,
      },
    });
  });
};

exports.getPostByIdAndUpdateViewCount = async (req, res, next) => {
  const { post_id } = req.params;
  const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  let results; // Declare the results variable outside for global scope

  // Start a transaction to ensure all queries are executed together
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    // Step 1: Retrieve the post and category details
    const selectQuery = `
      SELECT posts.*, categories.category_name 
      FROM posts 
      JOIN categories ON posts.category_id = categories.category_id
      WHERE posts.post_id = ?
    `;

    connection.query(selectQuery, [post_id], (err, queryResults) => {
      if (err) {
        return connection.rollback(() => {
          res.status(400).json({ message: err.message });
        });
      }
      if (queryResults.length === 0) {
        return connection.rollback(() => {
          res.status(404).json({ message: "Post not found" });
        });
      }

      // Store the query results for later use
      results = queryResults;

      // Step 2: Increment the views in the `posts` table
      const incrementViewsQuery = `
        UPDATE posts 
        SET views = views + 1 
        WHERE post_id = ?
      `;

      connection.query(incrementViewsQuery, [post_id], (err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(400).json({ message: err.message });
          });
        }

        // Step 3: Check and update views in the `post_views` table for the current date
        const findViewCountQuery = `
          SELECT * FROM post_views 
          WHERE post_id = ? AND view_date = ?
        `;

        const insertViewCountQuery = `
          INSERT INTO post_views (post_id, view_date, view_count)
          VALUES (?, ?, 1)
        `;

        const updateViewCountQuery = `
          UPDATE post_views 
          SET view_count = view_count + 1 
          WHERE post_id = ? AND view_date = ?
        `;

        connection.query(
          findViewCountQuery,
          [post_id, today],
          (err, viewResults) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: err.message });
              });
            }

            if (viewResults.length > 0) {
              // Update the view count if the record exists

              console.log(1);
              connection.query(
                updateViewCountQuery,
                [post_id, today],
                (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ message: err.message });
                    });
                  }
                  commitTransactionAndRespond();
                }
              );
            } else {
              // Insert a new record if no record for today exists
              connection.query(
                insertViewCountQuery,
                [post_id, today],
                (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ message: err.message });
                    });
                  }
                  commitTransactionAndRespond();
                }
              );
            }
          }
        );
      });
    });

    // Commit the transaction and send the response
    const commitTransactionAndRespond = () => {
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ message: err.message });
          });
        }
        res.status(200).json({
          success: true,
          message: "Post retrieved and view count updated successfully",
          data: results[0], // Return the post data
        });
      });
    };
  });
};

exports.submitComment = async (req, res, next) => {
  const { user_id, post_id, content } = req.body;

  const query =
    "INSERT INTO `comments` (`user_id`, `post_id`, `content`) VALUES (?, ?, ?)";
  const values = [user_id, post_id, content];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Comment submitted successfully",
      data: {
        user_id,
        post_id,
        content,
      },
    });
  });
};

exports.getPostsByCategoryId = async (req, res, next) => {
  const { category_id } = req.params;

  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
    WHERE posts.category_id = ?
  `;

  connection.query(query, [category_id], (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.getMostViewedPostLastDay = async (req, res, next) => {
  const query = `
    SELECT 
        p.post_id, 
        p.title, 
        p.thumbnail, 
        p.content, 
        p.user_id, 
        p.category_id, 
        p.createDate, 
        p.updateDate, 
        p.views,
        u.givenName,
        u.familyName,
        u.avatar_url
    FROM 
        simple_blog.posts p
    JOIN
        simple_blog.users u
    ON
        p.user_id = u.id
    WHERE 
        p.createDate >= NOW() - INTERVAL 1 DAY 
        OR p.updateDate >= NOW() - INTERVAL 1 DAY
    ORDER BY 
        p.views DESC
    LIMIT 1;
  `;

  connection.query(query, (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found in the last 24 hours" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

exports.deletePost = async (req, res, next) => {
  const { post_id, user_id } = req.body;

  if (!post_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Post ID and User ID are required" });
  }

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    // Check if the post belongs to the user
    const checkPostOwner = `
      SELECT * FROM posts 
      WHERE post_id = ? AND user_id = ?
    `;

    connection.query(checkPostOwner, [post_id, user_id], (err, results) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ message: err.message });
        });
      }

      if (results.length === 0) {
        return connection.rollback(() => {
          res.status(403).json({
            message:
              "Unauthorized: You do not have permission to delete this post",
          });
        });
      }

      const deleteCommentLikes = `
        DELETE cl FROM comment_likes cl 
        JOIN comments c ON cl.comment_id = c.comment_id 
        WHERE c.post_id = ?
      `;

      const deleteCommentDislikes = `
        DELETE cd FROM comment_dislikes cd 
        JOIN comments c ON cd.comment_id = c.comment_id 
        WHERE c.post_id = ?
      `;

      const deleteComments = "DELETE FROM comments WHERE post_id = ?";
      const deleteBookmarks = "DELETE FROM bookmarks WHERE post_id = ?";
      const deletePostViews = "DELETE FROM post_views WHERE post_id = ?";
      const deletePost = "DELETE FROM posts WHERE post_id = ?";

      connection.query(deleteCommentLikes, [post_id], (err, results) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ message: err.message });
          });
        }

        connection.query(deleteCommentDislikes, [post_id], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ message: err.message });
            });
          }

          connection.query(deleteComments, [post_id], (err, results) => {
            if (err) {
              return connection.rollback(() => {
                res.status(500).json({ message: err.message });
              });
            }

            connection.query(deleteBookmarks, [post_id], (err, results) => {
              if (err) {
                return connection.rollback(() => {
                  res.status(500).json({ message: err.message });
                });
              }

              // Delete post views
              connection.query(deletePostViews, [post_id], (err, results) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json({ message: err.message });
                  });
                }

                // Delete the post itself
                connection.query(deletePost, [post_id], (err, results) => {
                  if (err) {
                    return connection.rollback(() => {
                      res.status(500).json({ message: err.message });
                    });
                  }
                  if (results.affectedRows === 0) {
                    return connection.rollback(() => {
                      res.status(404).json({ message: "Post not found" });
                    });
                  }

                  connection.commit((err) => {
                    if (err) {
                      return connection.rollback(() => {
                        res.status(500).json({ message: err.message });
                      });
                    }
                    res.status(200).json({
                      success: true,
                      message: "Post deleted successfully",
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

exports.updatePost = async (req, res, next) => {
  const { post_id } = req.params;
  const { title, thumbnail, content, category_id } = req.body;

  const query = `
    UPDATE posts 
    SET 
      title = ?, 
      thumbnail = ?, 
      content = ?, 
      category_id = ?, 
      updateDate = NOW()
    WHERE 
      post_id = ?
  `;
  const values = [title, thumbnail, content, category_id, post_id];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: {
        post_id,
        title,
        thumbnail,
        content,
        category_id,
      },
    });
  });
};

exports.getPostByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  const query = `
    SELECT posts.*, categories.category_name 
    FROM posts 
    JOIN categories ON posts.category_id = categories.category_id
    WHERE posts.user_id = ?
    ORDER BY posts.createDate DESC
  `;

  connection.query(query, [user_id], (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.updatePostViewsForCurrentDate = async (post_id) => {
  const today = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const findViewCountQuery = `
    SELECT * FROM post_views 
    WHERE post_id = ? AND view_date = ?
  `;

  const insertViewCountQuery = `
    INSERT INTO post_views (post_id, view_date, view_count)
    VALUES (?, ?, 1)
  `;

  const updateViewCountQuery = `
    UPDATE post_views 
    SET view_count = view_count + 1 
    WHERE post_id = ? AND view_date = ?
  `;

  connection.query(findViewCountQuery, [post_id, today], (err, results) => {
    if (err) {
      console.error("Error fetching view count:", err.message);
      return;
    }

    if (results.length > 0) {
      // Update the view count if the record exists
      connection.query(
        updateViewCountQuery,
        [post_id, today],
        (err, results) => {
          if (err) {
            console.error("Error updating view count:", err.message);
            return;
          }
          console.log("View count updated for post:", post_id);
        }
      );
    } else {
      // Insert a new record if no record for today exists
      connection.query(
        insertViewCountQuery,
        [post_id, today],
        (err, results) => {
          if (err) {
            console.error("Error inserting new view count:", err.message);
            return;
          }
          console.log("New view count record created for post:", post_id);
        }
      );
    }
  });
};

exports.getYearlyViews = async (req, res, next) => {
  const now = new Date();
  const year = now.getFullYear();
  const { user_id } = req.params;

  // Construct the query string
  const query = `
    SELECT
        COALESCE(SUM(pv.view_count), 0) AS total_views,
        DATE_FORMAT(months.view_date, '%Y-%m') AS month
    FROM
        (SELECT
            DATE_SUB(CURDATE(), INTERVAL n MONTH) AS view_date
         FROM
            (SELECT @row := @row + 1 AS n
             FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t1,
                  (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t2,
                  (SELECT @row := -1) t3) d
         WHERE
            DATE_SUB(CURDATE(), INTERVAL n MONTH) >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        ) AS months
    LEFT JOIN
        simple_blog.post_views pv
    ON
        DATE_FORMAT(pv.view_date, '%Y-%m') = DATE_FORMAT(months.view_date, '%Y-%m')
        AND pv.post_id IN (
            SELECT post_id
            FROM simple_blog.posts
            WHERE user_id = ?
        )
    GROUP BY
        months.view_date
    ORDER BY
        months.view_date;
  `;

  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};

exports.getMonthlyViews = async (req, res, next) => {
  // Get the current date
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const { user_id } = req.params;

  // Construct the first day of the month for use in the query
  const firstDayOfMonth = `${year}-${month}-01`;

  // Construct the query string
  const query = `
    WITH RECURSIVE days AS (
        SELECT 1 AS day
        UNION ALL
        SELECT day + 1
        FROM days
        WHERE day < DAY(LAST_DAY(CONCAT(?, '-01')))
    ),
    views_per_day AS (
        SELECT 
            DAY(pv.view_date) AS view_day,
            COALESCE(SUM(pv.view_count), 0) AS total_views
        FROM 
            post_views pv
        JOIN 
            posts p ON pv.post_id = p.post_id
        WHERE 
            YEAR(pv.view_date) = ?
            AND MONTH(pv.view_date) = ?
            AND p.user_id = ?
        GROUP BY 
            DAY(pv.view_date)
    )
    SELECT 
        CONCAT(LPAD(d.day, 2, '0'), '-', DATE_FORMAT(CONCAT(?, '-01'), '%m'), '-', DATE_FORMAT(CONCAT(?, '-01'), '%Y')) AS day_with_month_year,
        COALESCE(vpd.total_views, 0) AS total_views
    FROM 
        days d
    LEFT JOIN 
        views_per_day vpd ON d.day = vpd.view_day
    ORDER BY 
        d.day ASC;
  `;

  connection.query(
    query,
    [firstDayOfMonth, year, month, user_id, firstDayOfMonth, firstDayOfMonth],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }

      res.status(200).json({
        success: true,
        data: results,
      });
    }
  );
};

exports.getTodayStatsByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  const query = `
    SELECT 
    p.post_id,
    p.title,
    p.thumbnail,
    COALESCE(COUNT(DISTINCT c.comment_id), 0) AS total_comments,
    COALESCE(COUNT(DISTINCT b.post_id), 0) AS total_bookmarks,
    COALESCE(SUM(v.view_count), 0) AS total_views
FROM simple_blog.posts p
LEFT JOIN simple_blog.comments c 
    ON p.post_id = c.post_id 
    AND DATE(c.createdAt) = CURDATE() 
LEFT JOIN simple_blog.bookmarks b 
    ON p.post_id = b.post_id 
    AND DATE(b.createdAt) = CURDATE()  
LEFT JOIN simple_blog.post_views v 
    ON p.post_id = v.post_id 
    AND DATE(v.view_date) = CURDATE() 
WHERE p.user_id = ? 
GROUP BY p.post_id;
  `;

  connection.query(query, [user_id], (err, results, fields) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this user today" });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.getViews = async (req, res, next) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const firstDayOfMonth = `${year}-${month}-01`;
  const { user_id } = req.params;

  // Query for yearly views
  const yearlyQuery = `
    SELECT
        COALESCE(SUM(pv.view_count), 0) AS total_views,
        DATE_FORMAT(months.view_date, '%Y-%m') AS month
    FROM
        (SELECT
            DATE_SUB(CURDATE(), INTERVAL n MONTH) AS view_date
         FROM
            (SELECT @row := @row + 1 AS n
             FROM (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t1,
                  (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) t2,
                  (SELECT @row := -1) t3) d
         WHERE
            DATE_SUB(CURDATE(), INTERVAL n MONTH) >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        ) AS months
    LEFT JOIN
        simple_blog.post_views pv
    ON
        DATE_FORMAT(pv.view_date, '%Y-%m') = DATE_FORMAT(months.view_date, '%Y-%m')
        AND pv.post_id IN (
            SELECT post_id
            FROM simple_blog.posts
            WHERE user_id = ?
        )
    GROUP BY
        months.view_date
    ORDER BY
        months.view_date;
  `;

  // Query for monthly views
  const monthlyQuery = `
    WITH RECURSIVE days AS (
        SELECT 1 AS day
        UNION ALL
        SELECT day + 1
        FROM days
        WHERE day < DAY(LAST_DAY(CONCAT(?, '-01')))
    ),
    views_per_day AS (
        SELECT 
            DAY(pv.view_date) AS view_day,
            COALESCE(SUM(pv.view_count), 0) AS total_views
        FROM 
            post_views pv
        JOIN 
            posts p ON pv.post_id = p.post_id
        WHERE 
            YEAR(pv.view_date) = ?
            AND MONTH(pv.view_date) = ?
            AND p.user_id = ?
        GROUP BY 
            DAY(pv.view_date)
    )
    SELECT 
        CONCAT(LPAD(d.day, 2, '0'), '-', DATE_FORMAT(CONCAT(?, '-01'), '%m'), '-', DATE_FORMAT(CONCAT(?, '-01'), '%Y')) AS day_with_month_year,
        COALESCE(vpd.total_views, 0) AS total_views
    FROM 
        days d
    LEFT JOIN 
        views_per_day vpd ON d.day = vpd.view_day
    ORDER BY 
        d.day ASC;
  `;

  try {
    // Execute both queries in parallel
    const [yearlyResults, monthlyResults] = await Promise.all([
      new Promise((resolve, reject) => {
        connection.query(yearlyQuery, [user_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(
          monthlyQuery,
          [
            firstDayOfMonth,
            year,
            month,
            user_id,
            firstDayOfMonth,
            firstDayOfMonth,
          ],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      }),
    ]);

    // Respond with both results
    res.status(200).json({
      success: true,
      data: {
        yearlyViews: yearlyResults,
        monthlyViews: monthlyResults,
      },
    });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
